export async function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}
