mod layout;
mod transition;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn layout_view(request_json: &str) -> Result<String, JsValue> {
    let request = serde_json::from_str(request_json)
        .map_err(|error| JsValue::from_str(&format!("Invalid layout request: {error}")))?;
    let result = layout::layout(request);
    serde_json::to_string(&result)
        .map_err(|error| JsValue::from_str(&format!("Could not serialize layout: {error}")))
}

#[wasm_bindgen]
pub fn transition_duration_ms(from: &str, to: &str, node_count: usize) -> u32 {
    transition::duration_ms(from, to, node_count)
}

#[wasm_bindgen]
pub fn transition_progress(elapsed_ms: u32, duration_ms: u32) -> f32 {
    transition::progress(elapsed_ms, duration_ms)
}
