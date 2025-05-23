/**
 * Code Paste Blocker
 * Created by Divyansh Singh (Arshthakur)
 * GitHub: https://github.com/divyanshsingh07
 * LinkedIn: https://www.linkedin.com/in/divyansh-singh-a33976255/
 */

// Array of funny messages
const copyPasteMessages = [
    "Aise copy karega toh placement mein HR bhi copy ho jaayegi!",
    "DSA mein copy kiya? Ab zindagi TLE de degi!",
    "Code samajh le pehle, warna interviewer bolega - Next!",
    "Jugaad se DSA nahi hota bhai, dimag laga!",
    "Copy paste se sirf degree milegi, job nahi!",
    "Aise copy kar raha hai jaise Shaadi.com ka biodata likh raha ho!",
    "Tere logic mein segmentation fault hai bhai!",
    "Iss copy ke liye toh mom bhi daantegi!",
    "Code tu nahi likh raha, code tujhe likh raha hai!",
    "Interview mein bolega 'I did this' - HR bolegi 'Exit is this way'!",
    "Kya kar raha hai bhai? Gharwale shaadi ki tension le rahe, tu yeh bhi nahi kar sakta?",
    "Aise copy karega toh Github tera resume ban jayega!",
    "Logic toh Zero, lekin copy speed 100 Mbps!",
    "DSA seekhne aaye ho ya 'CTRL+C ke Ustaad' banne?",
    "Beta, Leetcode hai, school ka homework nahi!"
];

// Function to get random message
function getRandomMessage() {
    return copyPasteMessages[Math.floor(Math.random() * copyPasteMessages.length)];
}

function blockAllCopyPaste() {
    console.log('Blocking copy and paste...');
    
    // Block selection (prevents copying through selection)
    document.addEventListener('selectstart', e => {
        e.preventDefault();
        console.log('Selection blocked');
    }, true);

    // Block context menu copy and paste
    document.addEventListener('copy', e => {
        console.log('Copy event blocked');
        e.stopImmediatePropagation();
        e.preventDefault();
        alert('Copying is disabled everywhere.');
    }, true);

    document.addEventListener('paste', e => {
        console.log('Paste event blocked');
        e.stopImmediatePropagation();
        e.preventDefault();
        alert('Pasting is disabled everywhere.');
    }, true);
  
    // Block keyboard copy (Ctrl+C / Cmd+C) and paste (Ctrl+V / Cmd+V)
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey)) {
            if (e.key.toLowerCase() === 'c' || e.key.toLowerCase() === 'x') {
                console.log('Copy/Cut keyboard shortcut blocked');
                e.preventDefault();
                alert('Keyboard copy is disabled.');
            } else if (e.key.toLowerCase() === 'v') {
                console.log('Paste keyboard shortcut blocked');
                e.preventDefault();
                alert('Keyboard paste is disabled.');
            }
        }
    }, true);
  
    // Block drag-and-drop paste into inputs
    document.querySelectorAll('input, textarea, [contenteditable]').forEach(el => {
        el.addEventListener('drop', e => {
            console.log('Drop event blocked');
            e.preventDefault();
            alert('Dropping/pasting is disabled.');
        });
    });
  
    // Extra: Override execCommand (some copy/paste operations may call it)
    const originalExecCommand = document.execCommand;
    document.execCommand = function(command) {
        console.log('execCommand blocked:', command);
        if (command === 'copy' || command === 'paste' || command === 'cut') {
            return false;
        }
        return originalExecCommand.apply(this, arguments);
    };
}

// Function to show timed alert
function showTimedAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff3cd;
        border: 1px solid #ffeeba;
        border-radius: 8px;
        padding: 15px 25px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 9999;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #856404;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        max-width: 80%;
        animation: slideIn .3s ease-out;
    `;

    // Add emoji with some spacing
    const messageParts = message.split('😏');
    alertBox.innerHTML = `
        <span style="display: block; margin-bottom: 5px;">${messageParts[0]}</span>
        <span style="font-size: 18px;">😏</span>
        <div style="font-size: 10px; margin-top: 5px; color: #666;">
            by Divyansh Singh (Arshthakur)
        </div>
    `;

    document.body.appendChild(alertBox);

    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translate(-50%, -100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Remove the alert after 3 seconds with fade-out
    setTimeout(() => {
        alertBox.style.opacity = '0';
        alertBox.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(alertBox);
            document.head.removeChild(style);
        }, 1000);
    }, 5000);
}

// Function to check if we're on a coding page
function isCodingPage() {
    const leetCodePattern = /leetcode\.com\/problems\/.*\/?$/;
    const gfgPattern = /geeksforgeeks\.org\/problems\/.*\/?$/;
    return leetCodePattern.test(window.location.href) || gfgPattern.test(window.location.href);
}

// Function to block code pasting
function blockCodePaste() {
    if (!isCodingPage()) return;

    console.log('Code Paste Blocker active on:', window.location.href);

    // Block paste in code editor
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                // Find code editor elements
                const codeEditors = document.querySelectorAll('textarea, pre, [role="textbox"], [contenteditable="true"]');
                codeEditors.forEach(editor => {
                    // Remove any existing paste event listeners
                    editor.removeEventListener('paste', handlePaste);
                    editor.removeEventListener('keydown', handleKeyDown);
                    editor.removeEventListener('drop', handleDrop);

                    // Add new event listeners
                    editor.addEventListener('paste', handlePaste, true);
                    editor.addEventListener('keydown', handleKeyDown, true);
                    editor.addEventListener('drop', handleDrop, true);
                });
            }
        });
    });

    // Event handler functions
    function handlePaste(e) {
        console.log('Paste event blocked');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        showTimedAlert(getRandomMessage());
        return false;
    }

    function handleKeyDown(e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
            console.log('Paste keyboard shortcut blocked');
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showTimedAlert(getRandomMessage());
            return false;
        }
    }

    function handleDrop(e) {
        console.log('Drop event blocked');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        showTimedAlert(getRandomMessage());
        return false;
    }

    // Start observing the document
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Block execCommand paste
    const originalExecCommand = document.execCommand;
    document.execCommand = function(command) {
        if (command === 'paste') {
            console.log('execCommand paste blocked');
            showTimedAlert(getRandomMessage());
            return false;
        }
        return originalExecCommand.apply(this, arguments);
    };

    // Additional protection: Block clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        const originalWriteText = navigator.clipboard.writeText;
        navigator.clipboard.writeText = async function(text) {
            console.log('Clipboard write blocked');
            showTimedAlert(getRandomMessage());
            return Promise.reject('Clipboard access blocked');
        };
    }
}

// Initialize blocking
chrome.storage.sync.get('blockingEnabled', (data) => {
    if (data.blockingEnabled !== false) {
        blockCodePaste();
    }
});

// Listen for changes in blocking state
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.blockingEnabled) {
        if (changes.blockingEnabled.newValue) {
            blockCodePaste();
        }
    }
});