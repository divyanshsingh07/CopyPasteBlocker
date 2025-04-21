const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

// Debug log
console.log('Popup script loaded');

// Load initial state
chrome.storage.sync.get('blockingEnabled', (data) => {
    const isEnabled = data.blockingEnabled !== false;
    toggle.checked = isEnabled;
    updateStatus(isEnabled);
});

// Update toggle state
toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;
    chrome.storage.sync.set({ blockingEnabled: isEnabled }, () => {
        updateStatus(isEnabled);
        // Notify all tabs to update their state
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, { 
                    action: 'updateBlockingState', 
                    enabled: isEnabled 
                });
            });
        });
    });
});

// Update status text and style
function updateStatus(isEnabled) {
    status.textContent = isEnabled ? 'Enabled' : 'Disabled';
    status.className = isEnabled ? 'status enabled' : 'status disabled';
}