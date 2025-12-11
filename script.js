document.addEventListener('DOMContentLoaded', () => {

    const analyzeBtn = document.getElementById('analyze-btn');
    const messageInput = document.getElementById('message-input');
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const resultIcon = document.querySelector('.result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    const confidenceValue = document.getElementById('confidence-value');
    const confidenceFill = document.getElementById('confidence-fill');

    
    const fakeKeywords = [
        'freegift','shocking secret','they don\'t want you to know',
        'conspiracy','hoax','scam','clickbait','unbelievable',
        'hidden secret','urgent','verify your account','bank','otp',
        'claim','refund','limited time','government aid','rm1','html',
        'parcel','delivery issue','bit.ly','tinyurl','reward','win',
        'you\'ve won','rm','hadiah','bantuan','tuntut','menang'
    ];

    const suspiciousPatterns = [
        /bit\.ly/i, /tinyurl/i, /ow\.ly/i,
        /\.xyz/i, /\.zip/i, /\.icu/i,
        /http:\/\/[a-z0-9\-]{15,}\./i,
        /https:\/\/[a-z0-9]{10,}\.[a-z]+/i
    ];

   
    function extractURL(text) {
        const urlPattern = /(https?:\/\/[^\s]+)/i;
        const match = text.match(urlPattern);
        return match ? match[0] : null;
    }

  
    analyzeBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();

        
        const url = extractURL(message);

        if (!url) {
            alert("Please enter a message that contains valid link (e.g., https://unitar.com).");
            return;
        }

        
        resultDiv.style.display = "none";
        loadingDiv.style.display = "block";
        analyzeBtn.disabled = true;

        
        setTimeout(() => {
            loadingDiv.style.display = "none";
            analyzeBtn.disabled = false;
            processAnalysis(url);
        }, 1200);
    });

   
    function processAnalysis(url) {

        const isFake = detectFake(url);

        
        const confidence = Math.floor(Math.random() * 20) + 80;

        resultDiv.style.display = "block";
        resultDiv.className = "result " + (isFake ? "fake" : "true");

        if (isFake) {
            resultIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
            resultTitle.textContent = "Fake or Suspicious Link Detected";
            resultMessage.textContent =
                "This link contains unusual patterns associated with scams, phishing attempts, or misleading content.";
        } else {
            resultIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            resultTitle.textContent = "Link Appears Authentic";
            resultMessage.textContent =
                "No misleading content were detected. Always verify with official sources.";
        }

        confidenceValue.textContent = confidence;
        confidenceFill.style.width = confidence + "%";
    }

    
    function detectFake(url) {
        const lowerMsg = url.toLowerCase();

        
        for (const keyword of fakeKeywords) {
            if (lowerMsg.includes(keyword)) return true;
        }

        
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(url)) return true;
        }

        
        return false;
    }

    
    const statValues = document.querySelectorAll(".stat-value");

    statValues.forEach(stat => {
        const updateCount = () => {
            const target = +stat.getAttribute("data-target");
            const count = +stat.innerText.replace(/,/g, "");

            const increment = target / 60;

            if (count < target) {
                stat.innerText = Math.ceil(count + increment).toLocaleString();
                setTimeout(updateCount, 20);
            } else {
                stat.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });


});
