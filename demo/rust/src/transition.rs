pub fn duration_ms(from: &str, to: &str, node_count: usize) -> u32 {
    if from == to {
        return 0;
    }

    let base = match (from, to) {
        ("culture", "scene") | ("scene", "culture") => 560,
        _ => 420,
    };
    let density_adjustment = (node_count.saturating_sub(8).min(20) as u32) * 8;
    base + density_adjustment
}

pub fn progress(elapsed_ms: u32, duration_ms: u32) -> f32 {
    if duration_ms == 0 {
        return 1.0;
    }
    let t = (elapsed_ms as f32 / duration_ms as f32).clamp(0.0, 1.0);
    let inverse = 1.0 - t;
    1.0 - inverse * inverse * inverse
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn same_view_does_not_animate() {
        assert_eq!(duration_ms("culture", "culture", 14), 0);
    }

    #[test]
    fn larger_views_receive_a_small_timing_allowance() {
        assert!(duration_ms("culture", "scene", 20) > duration_ms("culture", "scene", 8));
    }

    #[test]
    fn progress_is_clamped_and_eased() {
        assert_eq!(progress(0, 600), 0.0);
        assert_eq!(progress(800, 600), 1.0);
        assert!(progress(300, 600) > 0.5);
    }
}
