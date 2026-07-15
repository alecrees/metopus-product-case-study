use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
use std::f32::consts::{PI, TAU};

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LayoutRequest {
    pub mode: String,
    pub width: f32,
    pub height: f32,
    pub nodes: Vec<LayoutNodeInput>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LayoutNodeInput {
    pub id: String,
    pub kind: String,
    pub section: String,
    pub parent_id: Option<String>,
    pub weight: f32,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LayoutResult {
    pub canvas_height: f32,
    pub nodes: Vec<LayoutNodeOutput>,
    pub sections: Vec<SectionLabel>,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LayoutNodeOutput {
    pub id: String,
    pub kind: String,
    pub parent_id: Option<String>,
    pub x: f32,
    pub y: f32,
    pub size: f32,
    pub depth: f32,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SectionLabel {
    pub id: String,
    pub label: String,
    pub x: f32,
    pub y: f32,
}

pub fn layout(request: LayoutRequest) -> LayoutResult {
    if request.mode == "scene" {
        layout_scene(request)
    } else {
        layout_culture(request)
    }
}

fn layout_culture(request: LayoutRequest) -> LayoutResult {
    let width = request.width.max(280.0);
    let height = request.height.max(500.0);
    let center = [width / 2.0, height / 2.0];
    let short_edge = width.min(height);
    let compact = width < 560.0;
    let artist_size = if compact { 42.0 } else { 50.0 };
    let group_size = if compact { 54.0 } else { 64.0 };
    let home_size = if compact { 68.0 } else { 80.0 };

    let home = request.nodes.iter().find(|node| node.kind == "home");
    let groups: Vec<&LayoutNodeInput> = request
        .nodes
        .iter()
        .filter(|node| node.kind == "group")
        .collect();
    let free_artists: Vec<&LayoutNodeInput> = request
        .nodes
        .iter()
        .filter(|node| node.kind == "artist" && node.parent_id.is_none())
        .collect();
    let expanded_child_count = request
        .nodes
        .iter()
        .filter(|node| node.parent_id.is_some())
        .count();
    let compact_child_rows = expanded_child_count.div_ceil(3);
    let canvas_height = if compact && compact_child_rows > 0 {
        height + compact_child_rows as f32 * 72.0
    } else {
        height
    };

    let mut output = Vec::with_capacity(request.nodes.len());
    if let Some(node) = home {
        output.push(positioned(node, center[0], center[1], home_size, 1.0));
    }

    let group_radius = if compact {
        (short_edge * 0.245).clamp(78.0, 100.0)
    } else {
        (short_edge * 0.24).clamp(92.0, 178.0)
    };
    let mut group_positions: BTreeMap<String, [f32; 2]> = BTreeMap::new();
    for (index, group) in groups.iter().enumerate() {
        let angle = angle_for(index, groups.len(), -0.18);
        let x = center[0] + angle.cos() * group_radius;
        let y = center[1] + angle.sin() * group_radius;
        group_positions.insert(group.id.clone(), [x, y]);
        output.push(positioned(group, x, y, group_size, 0.78));
    }

    for group in &groups {
        let Some(anchor) = group_positions.get(&group.id) else {
            continue;
        };
        let children: Vec<&LayoutNodeInput> = request
            .nodes
            .iter()
            .filter(|node| node.parent_id.as_deref() == Some(group.id.as_str()))
            .collect();
        if compact {
            let rows = children.len().div_ceil(3);
            for (index, child) in children.iter().enumerate() {
                let row = index / 3;
                let row_start = row * 3;
                let count_on_row = children.len().saturating_sub(row_start).min(3);
                let column = index - row_start;
                let x = width * (column + 1) as f32 / (count_on_row + 1) as f32;
                let y = canvas_height - 56.0 - (rows - row - 1) as f32 * 76.0;
                output.push(positioned(child, x, y, artist_size * 0.9, 0.9));
            }
            continue;
        }

        let orbit = 128.0;
        let outward_angle = (anchor[1] - center[1]).atan2(anchor[0] - center[0]);
        for (index, child) in children.iter().enumerate() {
            let angle = if children.len() <= 1 {
                outward_angle
            } else {
                outward_angle - PI / 2.0 + PI * index as f32 / (children.len() - 1) as f32
            };
            output.push(positioned(
                child,
                anchor[0] + angle.cos() * orbit,
                anchor[1] + angle.sin() * orbit,
                artist_size * 0.9,
                0.9,
            ));
        }
    }

    let first_ring = if compact {
        (short_edge * 0.36).clamp(102.0, 138.0)
    } else {
        (short_edge * 0.39).clamp(146.0, 268.0)
    };
    let ring_step = if compact { 54.0 } else { 68.0 };
    let ring_capacity = if compact { 7 } else { 9 };
    for (index, artist) in free_artists.iter().enumerate() {
        let ring = index / ring_capacity;
        let ring_start = ring * ring_capacity;
        let count_on_ring = free_artists
            .len()
            .saturating_sub(ring_start)
            .min(ring_capacity);
        let ring_index = index - ring_start;
        let radius = first_ring + ring as f32 * ring_step;
        let angle = angle_for(ring_index, count_on_ring, 0.06 + ring as f32 * 0.11);
        let weight_scale = (0.92 + artist.weight.clamp(0.0, 1.0) * 0.16).clamp(0.9, 1.08);
        output.push(positioned(
            artist,
            center[0] + angle.cos() * radius,
            center[1] + angle.sin() * radius,
            artist_size * weight_scale,
            0.55,
        ));
    }

    LayoutResult {
        canvas_height,
        nodes: output,
        sections: Vec::new(),
    }
}

fn layout_scene(request: LayoutRequest) -> LayoutResult {
    let width = request.width.max(280.0);
    let requested_height = request.height.max(500.0);
    let compact = width < 560.0;
    let columns = if width < 420.0 {
        3
    } else if width < 760.0 {
        4
    } else {
        6
    };
    let horizontal_padding = if compact { 18.0 } else { 34.0 };
    let cell_width = (width - horizontal_padding * 2.0) / columns as f32;
    let node_size = (cell_width * 0.54).clamp(40.0, 58.0);
    let row_height = node_size + if compact { 44.0 } else { 50.0 };
    let section_gap = if compact { 34.0 } else { 42.0 };

    let mut by_section: BTreeMap<String, Vec<&LayoutNodeInput>> = BTreeMap::new();
    for node in &request.nodes {
        by_section
            .entry(node.section.clone())
            .or_default()
            .push(node);
    }

    let mut output = Vec::with_capacity(request.nodes.len());
    let mut sections = Vec::with_capacity(by_section.len());
    let mut cursor_y = 30.0;

    for (section_index, (section, nodes)) in by_section.iter().enumerate() {
        sections.push(SectionLabel {
            id: format!("section-{section_index}"),
            label: section.clone(),
            x: horizontal_padding,
            y: cursor_y,
        });
        cursor_y += 36.0;

        for (index, node) in nodes.iter().enumerate() {
            let column = index % columns;
            let row = index / columns;
            let x = horizontal_padding + cell_width * (column as f32 + 0.5);
            let y = cursor_y + row_height * row as f32 + node_size / 2.0;
            let weight_scale = (0.94 + node.weight.clamp(0.0, 1.0) * 0.12).clamp(0.92, 1.06);
            output.push(positioned(node, x, y, node_size * weight_scale, 0.7));
        }

        let rows = nodes.len().div_ceil(columns);
        cursor_y += rows as f32 * row_height + section_gap;
    }

    LayoutResult {
        canvas_height: requested_height.max(cursor_y),
        nodes: output,
        sections,
    }
}

fn positioned(node: &LayoutNodeInput, x: f32, y: f32, size: f32, depth: f32) -> LayoutNodeOutput {
    LayoutNodeOutput {
        id: node.id.clone(),
        kind: node.kind.clone(),
        parent_id: node.parent_id.clone(),
        x,
        y,
        size,
        depth,
    }
}

fn angle_for(index: usize, count: usize, phase: f32) -> f32 {
    if count == 0 {
        return phase;
    }
    TAU * index as f32 / count as f32 + phase
}

#[cfg(test)]
mod tests {
    use super::*;

    fn node(id: &str, kind: &str, section: &str, parent_id: Option<&str>) -> LayoutNodeInput {
        LayoutNodeInput {
            id: id.to_string(),
            kind: kind.to_string(),
            section: section.to_string(),
            parent_id: parent_id.map(str::to_string),
            weight: 0.7,
        }
    }

    #[test]
    fn culture_places_home_artist_at_the_center() {
        let result = layout(LayoutRequest {
            mode: "culture".to_string(),
            width: 1000.0,
            height: 600.0,
            nodes: vec![
                node("home", "home", "Alternative", None),
                node("artist", "artist", "Rock", None),
            ],
        });
        let home = result.nodes.iter().find(|item| item.id == "home").unwrap();
        assert_eq!([home.x, home.y], [500.0, 300.0]);
    }

    #[test]
    fn expanded_group_members_orbit_their_parent() {
        let result = layout(LayoutRequest {
            mode: "culture".to_string(),
            width: 900.0,
            height: 640.0,
            nodes: vec![
                node("home", "home", "Alternative", None),
                node("group", "group", "Electronic", None),
                node("member", "artist", "Electronic", Some("group")),
            ],
        });
        let group = result.nodes.iter().find(|item| item.id == "group").unwrap();
        let member = result
            .nodes
            .iter()
            .find(|item| item.id == "member")
            .unwrap();
        let distance = ((group.x - member.x).powi(2) + (group.y - member.y).powi(2)).sqrt();
        assert!((124.0..=132.0).contains(&distance));
    }

    #[test]
    fn scene_layout_emits_one_label_per_section() {
        let result = layout(LayoutRequest {
            mode: "scene".to_string(),
            width: 1000.0,
            height: 600.0,
            nodes: vec![
                node("one", "artist", "Electronic", None),
                node("two", "artist", "Rock", None),
                node("three", "artist", "Rock", None),
            ],
        });
        assert_eq!(result.sections.len(), 2);
        assert_eq!(result.nodes.len(), 3);
    }

    #[test]
    fn compact_group_members_use_a_bounded_tray() {
        let result = layout(LayoutRequest {
            mode: "culture".to_string(),
            width: 375.0,
            height: 560.0,
            nodes: vec![
                node("home", "home", "Alternative", None),
                node("group", "group", "Electronic", None),
                node("one", "artist", "Electronic", Some("group")),
                node("two", "artist", "Electronic", Some("group")),
                node("three", "artist", "Electronic", Some("group")),
                node("four", "artist", "Electronic", Some("group")),
                node("five", "artist", "Electronic", Some("group")),
            ],
        });
        let members: Vec<&LayoutNodeOutput> = result
            .nodes
            .iter()
            .filter(|item| item.parent_id.as_deref() == Some("group"))
            .collect();

        assert!(result.canvas_height > 560.0);
        assert!(members.iter().all(|item| item.x >= 60.0 && item.x <= 315.0));
        assert!(members.iter().all(|item| item.y > 500.0));
    }
}
