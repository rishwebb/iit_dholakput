document.addEventListener('DOMContentLoaded', () => {
    // --- 0. Theme Toggler (Day/Night Mode) ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check for saved theme
        const savedTheme = localStorage.getItem('dholakpurTheme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.checked = true;
        }

        themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('dholakpurTheme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('dholakpurTheme', 'dark');
            }
        });
    }

    // --- 0.5 Laddu Clicker Widget ---
    const ladduBtn = document.getElementById('clicker-btn');
    const scoreDisplay = document.getElementById('clicker-score');
    if (ladduBtn && scoreDisplay) {
        // Load saved score
        let currentScore = parseInt(localStorage.getItem('ladduScore') || '0');
        scoreDisplay.innerText = currentScore;

        ladduBtn.addEventListener('click', () => {
            currentScore += 1;
            scoreDisplay.innerText = currentScore;
            localStorage.setItem('ladduScore', currentScore.toString());
            
            // Pop animation on laddu
            ladduBtn.style.transform = 'scale(0.8)';
            setTimeout(() => ladduBtn.style.transform = 'scale(1)', 100);
            
            // Re-render bribe cost if on placement page
            updateBribeUI();
        });
    }

    // --- 0.6 Emergency Laddu Rain (Homepage) ---
    const dropBtn = document.getElementById('laddu-drop-btn');
    if (dropBtn) {
        dropBtn.addEventListener('click', () => {
            dropBtn.disabled = true;
            dropBtn.innerText = "RAINING... ☔";
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const laddu = document.createElement('div');
                    laddu.classList.add('falling-laddu');
                    laddu.innerText = "🟠"; // Laddu emoji representation
                    
                    // Random horizontal position and animation duration
                    laddu.style.left = Math.random() * 100 + 'vw';
                    laddu.style.animationDuration = Math.random() * 2 + 2 + 's';
                    
                    document.body.appendChild(laddu);
                    
                    // Remove after falling
                    setTimeout(() => laddu.remove(), 4000);
                }, i * 50); // Stagger the drops
            }
            
            setTimeout(() => {
                dropBtn.disabled = false;
                dropBtn.innerText = "Emergency Laddu Drop ☔";
            }, 3000);
        });
    }

    // --- 1. Live Stats Counter Animation ---
    const stats = [
        { id: 'laddu-count', target: 10000, suffix: '+' },
        { id: 'placement-rate', target: 100, suffix: '%' },
        { id: 'kirmada-attacks', target: 0, suffix: '' }
    ];

    stats.forEach(stat => {
        const el = document.getElementById(stat.id);
        if (el) {
            let current = 0;
            const increment = stat.target > 100 ? Math.ceil(stat.target / 100) : 1;
            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                    current = stat.target;
                    clearInterval(timer);
                }
                el.innerText = current.toLocaleString() + stat.suffix;
            }, 30);
        }
    });

    // 2. Anti-Gravity Mode
    const agBtn = document.getElementById('ag-toggle');
    if (agBtn) {
        agBtn.addEventListener('click', () => {
            const body = document.body;
            const isActive = body.classList.toggle('anti-gravity-active');
            
            agBtn.classList.toggle('active');
            agBtn.innerHTML = isActive ? '🛑' : '🚀';

            const elementsToFloat = document.querySelectorAll('h1, h2, h3, p, .card, img:not(.chancellor-img), .stat-box, .btn, .form-container, .styled-table');
            
            elementsToFloat.forEach(el => {
                if (isActive) {
                    const randomType = Math.floor(Math.random() * 3) + 1;
                    el.classList.add(`ag-${randomType}`);
                    // Add random delay so elements float out of sync
                    el.style.animationDelay = `${Math.random() * 2}s`;
                } else {
                    el.classList.remove('ag-1', 'ag-2', 'ag-3');
                    el.style.animationDelay = '0s';
                }
            });
        });
    }

    // --- 3. Admission Form Fake Submit && ID Generator ---
    const admissionForm = document.getElementById('admission-form-v2');
    const spinnerContainer = document.getElementById('spinner-container');
    const idCardContainer = document.getElementById('id-card-container');
    const formContainer = document.getElementById('form-container-box');
    
    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get Name
            const applicantName = document.getElementById('name').value || 'Unknown Aspirant';
            
            // Hide form, show spinner
            formContainer.style.display = 'none';
            spinnerContainer.style.display = 'block';
            
            // Wait 3 seconds
            setTimeout(() => {
                spinnerContainer.style.display = 'none';
                idCardContainer.style.display = 'flex';
                
                // Populate ID Card Data
                document.getElementById('id-name-display').innerText = applicantName;
                
                const randomRoll = 'IITD-' + Math.floor(Math.random() * 99) + '-' + Math.floor(Math.random() * 9999) + 'X';
                document.getElementById('id-roll-display').innerText = 'Roll No: ' + randomRoll;
                
                const hostels = ['Kalia Bhawan', 'Jaggu Wing', 'Indumati Enclave', 'Dholu-Bholu Dormitory'];
                const randomHostel = hostels[Math.floor(Math.random() * hostels.length)];
                document.getElementById('id-hostel-display').innerText = 'Hostel: ' + randomHostel;
                
            }, 3000);
        });
    }

    // --- 4. Report Kalia Modal ---
    const reportBtns = document.querySelectorAll('.report-btn');
    const reportModal = document.getElementById('report-modal');
    const reportModalClose = document.getElementById('report-modal-close');
    const reportModalOk = document.getElementById('report-modal-ok');

    if (reportBtns.length > 0 && reportModal) {
        reportBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                reportModal.classList.add('active');
            });
        });

        // Close via 'X' or 'Understood' button
        const closeReportModal = () => reportModal.classList.remove('active');
        if (reportModalClose) reportModalClose.addEventListener('click', closeReportModal);
        if (reportModalOk) reportModalOk.addEventListener('click', closeReportModal);

        // Close on background click
        reportModal.addEventListener('click', (e) => {
            if (e.target === reportModal) {
                closeReportModal();
            }
        });
    }

    // --- 5. Accordions (Academics) ---
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // --- 6. Salary Calculator (Placements) ---
    const salaryForm = document.getElementById('salary-calc-form');
    const calcResult = document.getElementById('calc-result');
    const calcPackage = document.getElementById('calc-package');
    
    if (salaryForm) {
        salaryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const gpa = parseFloat(document.getElementById('gpa-input').value);
            
            let packageString = "";
            if (gpa >= 9.5) {
                packageString = "500 Gold Coins + Lifetime Free Tun Tun Laddoos (Tier 1)";
            } else if (gpa >= 8.0) {
                packageString = "250 Gold Coins + 10x Free Meals at Pehelwan Dhaba (Tier 2)";
            } else if (gpa >= 6.0) {
                packageString = "50 Gold Coins + Assistant to Dholu/Bholu (Tier 3)";
            } else {
                packageString = "Unpaid Internship sweeping the Mud Wrestling Arena";
            }
            
            calcPackage.innerText = packageString;
            calcResult.style.display = 'block';
        });
    }

    // --- 6.5 Bribe Tun Tun Mausi (Placements) ---
    const bribeBtn = document.getElementById('bribe-tuntun-btn');
    const bribeCostDisplay = document.getElementById('bribe-cost-display');
    const bribeStatus = document.getElementById('bribe-status');
    let currentBribeCost = 50; // Starting cost in laddus

    function updateBribeUI() {
        if (bribeCostDisplay && bribeBtn) {
            let currentScore = parseInt(localStorage.getItem('ladduScore') || '0');
            bribeCostDisplay.innerText = currentBribeCost;
            if (currentScore >= currentBribeCost) {
                bribeBtn.disabled = false;
                bribeBtn.classList.add('can-bribe');
            } else {
                bribeBtn.disabled = true;
                bribeBtn.classList.remove('can-bribe');
            }
        }
    }

    // Initial check
    updateBribeUI();

    if (bribeBtn) {
        bribeBtn.addEventListener('click', () => {
            let currentScore = parseInt(localStorage.getItem('ladduScore') || '0');
            if (currentScore >= currentBribeCost) {
                // Deduct laddus
                currentScore -= currentBribeCost;
                localStorage.setItem('ladduScore', currentScore.toString());
                if (scoreDisplay) scoreDisplay.innerText = currentScore;
                
                // Increase next bribe cost
                currentBribeCost = Math.floor(currentBribeCost * 1.5);
                updateBribeUI();

                // Show success status
                bribeStatus.innerHTML = "🤑 Tun Tun Mausi accepts your offering! Salary secretly inflated by <strong>2,00,000 Gold Coins</strong>.";
                bribeStatus.style.color = "var(--accent-col)";
                bribeStatus.classList.add('pulse-danger'); // Add a subtle pulse
                
                setTimeout(() => bribeStatus.classList.remove('pulse-danger'), 1000);
            }
        });
    }

    // --- 7. Campus Map Modal ---
    const zones = document.querySelectorAll('.map-zone');
    const modal = document.getElementById('map-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    const zoneData = {
        'library': { title: 'Central Laddu Library', desc: 'Contains over 5,000 ancient scrolls detailing the history of confectionery arts and structural laddu mechanics. Strictly no eating inside.' },
        'arena': { title: 'Royal Mud Wrestling Arena', desc: 'The proving ground. Students settle disputes regarding computational complexity theories here via traditional mud wrestling.' },
        'stash': { title: 'Secret Laddu Stash', desc: 'Raja Indraverma\'s heavily guarded reserve. Security entails three dragons and a very confused Jaggu.' },
        'canteen': { title: 'Tun Tun Canteen', desc: '100% placement happens right here. Also serves the famous "Overclocked Jalebi" for exam nights.' },
        'forest': { title: 'Forbidden Dholakpur Forest', desc: 'Students are prohibited from entering unless supervised by Chhota Bheem. Kirmada occasionally hosts unauthorized hackathons here.' }
    };

    if (zones.length > 0 && modal) {
        zones.forEach(zone => {
            zone.addEventListener('click', (e) => {
                const zoneId = zone.getAttribute('data-zone');
                if (zoneData[zoneId]) {
                    modalTitle.innerText = zoneData[zoneId].title;
                    modalBody.innerText = zoneData[zoneId].desc;
                    modal.classList.add('active');
                }
            });
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});
