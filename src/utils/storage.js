export function loadProgress(){ try{ const raw=localStorage.getItem('study_progress'); return raw? JSON.parse(raw): {}; }catch(e){return {}; } }
export function saveProgress(obj){ try{ localStorage.setItem('study_progress', JSON.stringify(obj)); }catch(e){} }
