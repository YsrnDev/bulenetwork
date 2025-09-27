// Enhanced Navigation and Theme Manager for Tailwind CSS

class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.isMenuOpen = false;

        this.init();
    }

    init() {
        // Scroll handler for navbar transparency
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking links
        const mobileLinks = this.mobileMenu?.querySelectorAll('a');
        mobileLinks?.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen &&
                !this.mobileMenu.contains(e.target) &&
                !this.hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Initial state
        this.handleScroll();
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;

        if (scrolled) {
            // Transparent background when scrolled
            this.navbar.classList.remove('bg-gradient-to-r', 'from-primary-500', 'to-purple-600');
            this.navbar.classList.add('bg-white/80', 'dark:bg-slate-900/80', 'backdrop-blur-md', 'shadow-lg');

            // Change text color for visibility
            const links = this.navbar.querySelectorAll('a, h2');
            links.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-slate-900', 'dark:text-white');
            });

            // Update link hover states
            const navLinks = this.navbar.querySelectorAll('a[href^="#"]');
            navLinks.forEach(link => {
                link.classList.remove('text-white/90', 'hover:text-white');
                link.classList.add('text-slate-700', 'dark:text-slate-300', 'hover:text-primary-500');
            });

            // Update hamburger color
            const hamburgerSpans = this.hamburger?.querySelectorAll('span');
            hamburgerSpans?.forEach(span => {
                span.classList.remove('bg-white');
                span.classList.add('bg-slate-900', 'dark:bg-white');
            });

            // Update admin button border and background
            const adminBtn = document.getElementById('admin-login');
            if (adminBtn) {
                adminBtn.classList.remove('bg-white/20', 'border-white/30');
                adminBtn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'border-slate-300', 'dark:border-slate-600');
            }

        } else {
            // Hero gradient when at top
            this.navbar.classList.add('bg-gradient-to-r', 'from-primary-500', 'to-purple-600');
            this.navbar.classList.remove('bg-white/80', 'dark:bg-slate-900/80', 'backdrop-blur-md', 'shadow-lg');

            // White text for hero section
            const links = this.navbar.querySelectorAll('a, h2');
            links.forEach(link => {
                link.classList.add('text-white');
                link.classList.remove('text-slate-900', 'dark:text-white', 'text-slate-700', 'dark:text-slate-300');
            });

            // Update link hover states
            const navLinks = this.navbar.querySelectorAll('a[href^="#"]');
            navLinks.forEach(link => {
                link.classList.add('text-white/90', 'hover:text-white');
                link.classList.remove('text-slate-700', 'dark:text-slate-300', 'hover:text-primary-500');
            });

            // Update hamburger to white
            const hamburgerSpans = this.hamburger?.querySelectorAll('span');
            hamburgerSpans?.forEach(span => {
                span.classList.add('bg-white');
                span.classList.remove('bg-slate-900', 'dark:bg-white');
            });

            // Reset admin button to hero style
            const adminBtn = document.getElementById('admin-login');
            if (adminBtn) {
                adminBtn.classList.add('bg-white/20', 'border-white/30');
                adminBtn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'border-slate-300', 'dark:border-slate-600');
            }
        }
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;

        if (this.isMenuOpen) {
            this.mobileMenu.classList.remove('-translate-x-full');
            this.hamburger.classList.add('active');

            // Animate hamburger to X
            const spans = this.hamburger.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';

            // Lock body scroll
            document.body.style.overflow = 'hidden';
        } else {
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.mobileMenu.classList.add('-translate-x-full');
        this.hamburger.classList.remove('active');

        // Reset hamburger
        const spans = this.hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';

        // Unlock body scroll
        document.body.style.overflow = '';
    }
}

class DarkModeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.htmlElement = document.documentElement;
        this.currentTheme = localStorage.getItem('theme') || 'light';

        this.init();
    }

    init() {
        // Apply saved theme
        if (this.currentTheme === 'dark') {
            this.htmlElement.classList.add('dark');
            this.updateToggleIcon(true);
        }

        // Toggle handler
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggle());
        }
    }

    toggle() {
        const isDark = this.htmlElement.classList.contains('dark');

        if (isDark) {
            this.htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            this.updateToggleIcon(false);
        } else {
            this.htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            this.updateToggleIcon(true);
        }
    }

    updateToggleIcon(isDark) {
        const sunIcon = this.themeToggle.querySelector('.sun-icon');
        const moonIcon = this.themeToggle.querySelector('.moon-icon');

        if (isDark) {
            sunIcon.style.opacity = '0';
            sunIcon.style.transform = 'rotate(-180deg) scale(0.5)';
            moonIcon.style.opacity = '1';
            moonIcon.style.transform = 'rotate(0deg) scale(1)';
        } else {
            sunIcon.style.opacity = '1';
            sunIcon.style.transform = 'rotate(0deg) scale(1)';
            moonIcon.style.opacity = '0';
            moonIcon.style.transform = 'rotate(180deg) scale(0.5)';
        }
    }
}

// Payment System
class PaymentManager {
    constructor() {
        this.form = document.getElementById('payment-form');
        this.billInfo = document.getElementById('bill-info');
        this.payButton = document.getElementById('pay-now');
        this.customerDatabase = {
            'INT001': {
                name: 'Budi Santoso',
                package: 'Paket Premium',
                phone: '081234567890',
                amount: 'Rp 499.000',
                period: 'September 2024',
                dueDate: '15 Oktober 2024',
                status: 'unpaid'
            },
            'INT002': {
                name: 'Siti Nurhaliza',
                package: 'Paket Basic',
                phone: '082345678901',
                amount: 'Rp 299.000',
                period: 'September 2024',
                dueDate: '20 Oktober 2024',
                status: 'unpaid'
            },
            'INT003': {
                name: 'Ahmad Rahman',
                package: 'Paket Ultra',
                phone: '083456789012',
                amount: 'Rp 799.000',
                period: 'September 2024',
                dueDate: '10 Oktober 2024',
                status: 'unpaid'
            }
        };

        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        if (this.payButton) {
            this.payButton.addEventListener('click', () => this.processPayment());
        }

        // Payment method selection
        document.addEventListener('change', (e) => {
            if (e.target.name === 'payment-method') {
                this.enablePayButton();
            }
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const customerId = document.getElementById('customer-id').value.trim().toUpperCase();
        const submitBtn = this.form.querySelector('button[type="submit"]');

        // Add loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Mencari...</span>';

        setTimeout(() => {
            if (!this.customerDatabase[customerId]) {
                alert('ID Pelanggan tidak ditemukan. Silakan periksa kembali ID pelanggan Anda.\n\nContoh ID yang tersedia:\n• INT001\n• INT002\n• INT003');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Cek Tagihan</span>';
                return;
            }

            const customer = this.customerDatabase[customerId];
            this.displayBillInfo(customer);

            // Show bill info
            this.billInfo.style.display = 'block';
            this.billInfo.scrollIntoView({ behavior: 'smooth', block: 'center' });

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Cek Tagihan</span>';
        }, 1000);
    }

    displayBillInfo(customer) {
        document.getElementById('customer-name').textContent = customer.name;
        document.getElementById('package-type').textContent = customer.package;
        document.getElementById('billing-period').textContent = customer.period;
        document.getElementById('due-date').textContent = customer.dueDate;
        document.getElementById('total-amount').textContent = customer.amount;
    }

    enablePayButton() {
        if (this.payButton) {
            this.payButton.disabled = false;
            this.payButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    processPayment() {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked');

        if (!selectedMethod) {
            alert('Silakan pilih metode pembayaran terlebih dahulu.');
            return;
        }

        const customerId = document.getElementById('customer-id').value.trim().toUpperCase();
        const customer = this.customerDatabase[customerId];
        const paymentMethod = selectedMethod.value;

        // Add loading animation
        this.payButton.disabled = true;
        this.payButton.innerHTML = '<span>Memproses Pembayaran...</span>';

        setTimeout(() => {
            let message = '';

            switch(paymentMethod) {
                case 'bank-transfer':
                    message = `🏦 Silakan transfer ke rekening berikut:\n\nBank BCA: 123-456-789\nAtas Nama: PT InternetKu\nJumlah: ${customer.amount}\n\n✅ Setelah transfer, tagihan akan otomatis terbayar dalam 1x24 jam.`;
                    break;
                case 'e-wallet':
                    message = `📱 Scan QR code dengan aplikasi e-wallet Anda:\n\nAtau gunakan nomor virtual: 08123456789\nJumlah: ${customer.amount}\n\n💡 Pembayaran akan langsung terverifikasi`;
                    break;
                case 'credit-card':
                    message = `💳 Pembayaran Berhasil!\n\nTerima kasih! Tagihan Anda telah berhasil dibayar.`;
                    break;
                case 'virtual-account':
                    const vaNumber = this.generateVANumber();
                    message = `🏧 Nomor Virtual Account Anda:\n\n${vaNumber}\n\nJumlah: ${customer.amount}\nBerlaku hingga: ${customer.dueDate}\n\n💳 Bayar melalui ATM, internet banking, atau mobile banking.`;
                    break;
            }

            alert(message);
            this.payButton.disabled = false;
            this.payButton.innerHTML = '<span>Bayar Sekarang</span>';
        }, 2000);
    }

    generateVANumber() {
        const bankCode = '70012';
        const customerCode = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
        return bankCode + customerCode;
    }
}

// Contact Form Manager
class ContactManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.whatsappNumber = '6281246015380';

        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();
        const packageType = document.getElementById('contact-package').value;
        const message = document.getElementById('contact-message').value.trim();

        // Get package name for display
        const packageNames = {
            '15mbps': 'Paket 15 Mbps - Rp 150.000',
            '20mbps': 'Paket 20 Mbps - Rp 200.000 (Terpopuler)',
            '30mbps': 'Paket 30 Mbps - Rp 250.000'
        };

        // Create WhatsApp message
        let whatsappMessage = `*Bule Network - Formulir Kontak*\n\n`;
        whatsappMessage += `📝 *Nama:* ${name}\n`;
        whatsappMessage += `📧 *Email:* ${email}\n`;
        whatsappMessage += `📱 *Telepon:* ${phone}\n`;
        whatsappMessage += `📦 *Paket:* ${packageNames[packageType] || packageType}\n`;

        if (message) {
            whatsappMessage += `💬 *Pesan:* ${message}\n`;
        }

        whatsappMessage += `\n⚡ *Salam dari Bule Network!*`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;

        // Add loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Mengirim...</span>';

        // Simulate processing time then open WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');

            // Reset form
            this.form.reset();

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // Show success message
            alert('Pesan berhasil disiapkan! WhatsApp akan terbuka untuk mengirim pesan.');
        }, 1000);
    }
}

// Smooth Scroll
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
}

// Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.track = document.getElementById('testimonial-track');
        this.prevBtn = document.getElementById('prev-testimonial');
        this.nextBtn = document.getElementById('next-testimonial');
        this.dots = document.querySelectorAll('.testimonial-dot');
        this.currentSlide = 0;
        this.totalSlides = 6;
        this.autoSlideInterval = null;

        this.init();
    }

    init() {
        if (!this.track) return;

        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Touch/swipe support
        this.addTouchSupport();

        // Auto-slide
        this.startAutoSlide();

        // Pause auto-slide on hover
        const slider = document.getElementById('testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.stopAutoSlide());
            slider.addEventListener('mouseleave', () => this.startAutoSlide());
        }

        // Initialize first slide
        this.updateSlider();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlider();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    updateSlider() {
        if (!this.track) return;

        // Move the track
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        // Update dots
        this.dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.remove('bg-white/50');
                dot.classList.add('bg-white');
            } else {
                dot.classList.remove('bg-white');
                dot.classList.add('bg-white/50');
            }
        });
    }

    addTouchSupport() {
        // Make these variables accessible to both functions
        this.startX = 0;
        this.endX = 0;
        this.isDragging = false;
        this.startTime = 0;

        // Touch events for mobile/tablet
        this.track.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
            this.startTime = Date.now();
            this.isDragging = true;
            this.stopAutoSlide();
        }, { passive: true });

        this.track.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;

            const currentX = e.touches[0].clientX;
            const diff = this.startX - currentX;
            const movePercent = (diff / this.track.offsetWidth) * 100;

            // Apply visual feedback during drag
            const currentTranslate = -this.currentSlide * 100;
            this.track.style.transform = `translateX(${currentTranslate - movePercent}%)`;
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            if (!this.isDragging) return;

            this.endX = e.changedTouches[0].clientX;
            this.isDragging = false;

            // Reset transform to current slide position
            this.updateSlider();
            this.handleSwipe();
            this.startAutoSlide();
        }, { passive: true });

        // Mouse events for desktop
        this.track.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.startX = e.clientX;
            this.startTime = Date.now();
            this.isDragging = true;
            this.track.style.cursor = 'grabbing';
            this.track.style.userSelect = 'none';
            this.stopAutoSlide();
        });

        this.track.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;

            e.preventDefault();
            const currentX = e.clientX;
            const diff = this.startX - currentX;
            const movePercent = (diff / this.track.offsetWidth) * 100;

            // Apply visual feedback during drag
            const currentTranslate = -this.currentSlide * 100;
            this.track.style.transform = `translateX(${currentTranslate - movePercent}%)`;
        });

        this.track.addEventListener('mouseup', (e) => {
            if (!this.isDragging) return;

            this.endX = e.clientX;
            this.isDragging = false;
            this.track.style.cursor = 'grab';
            this.track.style.userSelect = '';

            // Reset transform to current slide position
            this.updateSlider();
            this.handleSwipe();
            this.startAutoSlide();
        });

        this.track.addEventListener('mouseleave', (e) => {
            if (!this.isDragging) return;

            this.endX = e.clientX;
            this.isDragging = false;
            this.track.style.cursor = 'grab';
            this.track.style.userSelect = '';

            // Reset transform to current slide position
            this.updateSlider();
            this.handleSwipe();
            this.startAutoSlide();
        });

        // Prevent context menu on long press
        this.track.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Initial cursor style
        this.track.style.cursor = 'grab';
    }

    handleSwipe() {
        const threshold = 50;
        const diff = this.startX - this.endX;
        const timeDiff = Date.now() - this.startTime;

        // Only trigger swipe if movement is significant and not too slow
        if (Math.abs(diff) > threshold && timeDiff < 500) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        } else {
            // If swipe wasn't significant enough, snap back to current slide
            this.updateSlider();
        }
    }

    startAutoSlide() {
        this.stopAutoSlide(); // Clear any existing interval
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Scroll to Top Button
class ScrollToTopManager {
    constructor() {
        this.scrollButton = document.getElementById('scroll-to-top');
        this.isVisible = false;
        this.lastScrollY = 0;

        this.init();
    }

    init() {
        if (!this.scrollButton) return;

        // Add click event listener
        this.scrollButton.addEventListener('click', () => this.scrollToTop());

        // Add scroll event listener
        window.addEventListener('scroll', () => this.handleScroll());

        // Initial check
        this.handleScroll();
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollProgress = currentScrollY / (documentHeight - windowHeight);

        // Show button when user scrolls down significantly (more than 50% of page)
        // or when near the bottom (within 80% of total scroll)
        const shouldShow = scrollProgress > 0.5 ||
                          (currentScrollY > 500 && currentScrollY + windowHeight >= documentHeight * 0.8);

        if (shouldShow && !this.isVisible) {
            this.showButton();
        } else if (!shouldShow && this.isVisible) {
            this.hideButton();
        }

        this.lastScrollY = currentScrollY;
    }

    showButton() {
        this.isVisible = true;
        this.scrollButton.classList.remove('opacity-0', 'invisible');
        this.scrollButton.classList.add('opacity-100', 'visible');

        // Add bounce animation when showing
        this.scrollButton.style.animation = 'bounce 0.6s ease-in-out';
        setTimeout(() => {
            this.scrollButton.style.animation = '';
        }, 600);
    }

    hideButton() {
        this.isVisible = false;
        this.scrollButton.classList.remove('opacity-100', 'visible');
        this.scrollButton.classList.add('opacity-0', 'invisible');
    }

    scrollToTop() {
        // Add loading animation
        this.scrollButton.innerHTML = '<span class="animate-spin">⟳</span>';

        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Reset button after scroll completes
        setTimeout(() => {
            this.scrollButton.innerHTML = '<span class="text-xl">↑</span>';
        }, 1000);
    }
}

// Package Selection Modal
class PackageModalManager {
    constructor() {
        this.modal = document.getElementById('package-modal');
        this.closeBtn = document.getElementById('close-modal');
        this.cancelBtn = document.getElementById('cancel-order');
        this.form = document.getElementById('package-order-form');
        this.packageButtons = document.querySelectorAll('.package-select-btn');
        this.whatsappNumber = '6281246015380';
        this.selectedPackage = null;

        this.init();
    }

    init() {
        if (!this.modal) return;

        // Add click listeners to package selection buttons
        this.packageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.openModal(e));
        });

        // Close modal events
        this.closeBtn?.addEventListener('click', () => this.closeModal());
        this.cancelBtn?.addEventListener('click', () => this.closeModal());

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen()) {
                this.closeModal();
            }
        });

        // Form submission
        this.form?.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Add KTP input formatting
        this.addKTPFormatting();
    }

    addKTPFormatting() {
        const ktpInput = document.getElementById('order-ktp');
        if (!ktpInput) return;

        // Format KTP input - only allow numbers and limit to 16 digits
        ktpInput.addEventListener('input', (e) => {
            // Get the current cursor position
            const cursorPosition = e.target.selectionStart;

            // Remove all non-digits
            let value = e.target.value.replace(/\D/g, '');

            // Limit to 16 digits
            if (value.length > 16) {
                value = value.substring(0, 16);
            }

            // Format with spaces every 4 digits for readability
            let formatted = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formatted += ' ';
                }
                formatted += value[i];
            }

            // Update the input value
            e.target.value = formatted;

            // Calculate new cursor position accounting for spaces
            let newCursorPosition = cursorPosition;
            const spacesBeforeCursor = (formatted.substring(0, cursorPosition).match(/ /g) || []).length;
            const digitsBeforeCursor = formatted.substring(0, cursorPosition).replace(/\s/g, '').length;

            // Adjust cursor position if we're adding spaces
            if (digitsBeforeCursor > 0 && digitsBeforeCursor % 4 === 0 && formatted[cursorPosition - 1] !== ' ') {
                newCursorPosition = cursorPosition;
            }

            // Set cursor position
            setTimeout(() => {
                e.target.setSelectionRange(newCursorPosition, newCursorPosition);
            }, 0);
        });

        // Prevent non-numeric input
        ktpInput.addEventListener('keypress', (e) => {
            // Allow backspace, delete, tab, escape, enter
            if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true)) {
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

        // Handle paste events
        ktpInput.addEventListener('paste', (e) => {
            e.preventDefault();
            const paste = (e.clipboardData || window.clipboardData).getData('text');
            const numbers = paste.replace(/\D/g, '').substring(0, 16);

            // Format the pasted numbers
            let formatted = '';
            for (let i = 0; i < numbers.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formatted += ' ';
                }
                formatted += numbers[i];
            }

            ktpInput.value = formatted;
        });
    }

    openModal(e) {
        const button = e.target.closest('.package-select-btn');
        if (!button) return;

        // Get package data from button attributes
        this.selectedPackage = {
            id: button.dataset.package,
            name: button.dataset.name,
            price: button.dataset.price,
            speed: button.dataset.speed
        };

        // Update modal content
        this.updateModalContent();

        // Show modal
        this.modal.classList.remove('opacity-0', 'invisible');
        this.modal.querySelector('.bg-white').classList.remove('scale-95');
        this.modal.querySelector('.bg-white').classList.add('scale-100');

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Focus first input
        setTimeout(() => {
            document.getElementById('order-name')?.focus();
        }, 300);
    }

    closeModal() {
        this.modal.classList.add('opacity-0', 'invisible');
        this.modal.querySelector('.bg-white').classList.remove('scale-100');
        this.modal.querySelector('.bg-white').classList.add('scale-95');

        // Unlock body scroll
        document.body.style.overflow = '';

        // Reset form
        this.form?.reset();
    }

    isModalOpen() {
        return !this.modal.classList.contains('invisible');
    }

    updateModalContent() {
        if (!this.selectedPackage) return;

        const nameEl = document.getElementById('modal-package-name');
        const priceEl = document.getElementById('modal-package-price');

        if (nameEl) nameEl.textContent = this.selectedPackage.name;
        if (priceEl) priceEl.textContent = this.selectedPackage.price;
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name').trim(),
            phone: formData.get('phone').trim(),
            ktp: formData.get('ktp').trim(),
            email: formData.get('email').trim(),
            address: formData.get('address').trim(),
            installation: formData.get('installation'),
            notes: formData.get('notes').trim()
        };

        // Validation
        if (!data.name || !data.phone || !data.ktp || !data.address) {
            alert('Mohon lengkapi semua field yang wajib diisi (*)');
            return;
        }

        // Phone number validation
        const phoneRegex = /^(\+62|62|0)[0-9]{8,13}$/;
        if (!phoneRegex.test(data.phone.replace(/[\s-]/g, ''))) {
            alert('Nomor WhatsApp tidak valid. Gunakan format: 08123456789');
            return;
        }

        // KTP validation
        const ktpRegex = /^[0-9]{16}$/;
        if (!ktpRegex.test(data.ktp.replace(/[\s-]/g, ''))) {
            alert('Nomor KTP tidak valid. Nomor KTP harus 16 digit angka.');
            return;
        }

        // Create WhatsApp message
        this.sendToWhatsApp(data);
    }

    sendToWhatsApp(data) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Add loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="animate-spin">⟳</span> Mengirim...';

        // Format installation time
        const installationTime = {
            'pagi': 'Pagi (08:00 - 12:00)',
            'siang': 'Siang (12:00 - 16:00)',
            'sore': 'Sore (16:00 - 18:00)',
            'fleksibel': 'Fleksibel (sesuai jadwal teknisi)'
        };

        // Create WhatsApp message
        let message = `*BULE NETWORK - BERLANGGANAN PAKET INTERNET*\n\n`;
        message += `📦 *Paket yang Dipilih:*\n`;
        message += `• ${this.selectedPackage.name}\n`;
        message += `• Kecepatan: ${this.selectedPackage.speed}\n`;
        message += `• Harga: ${this.selectedPackage.price}\n\n`;

        message += `👤 *Data Pelanggan:*\n`;
        message += `• Nama: ${data.name}\n`;
        message += `• WhatsApp: ${data.phone}\n`;
        message += `• Nomor KTP: ${data.ktp}\n`;
        if (data.email) {
            message += `• Email: ${data.email}\n`;
        }
        message += `• Alamat: ${data.address}\n\n`;

        if (data.installation) {
            message += `🔧 *Waktu Instalasi:*\n`;
            message += `• ${installationTime[data.installation] || data.installation}\n\n`;
        }

        if (data.notes) {
            message += `📝 *Catatan:*\n`;
            message += `${data.notes}\n\n`;
        }

        message += `⚡ *Terima kasih telah memilih Bule Network!*\n`;
        message += `Tim kami akan segera menghubungi Anda untuk proses selanjutnya.`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;

        // Simulate processing time then open WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // Close modal
            this.closeModal();

            // Show success message
            this.showSuccessMessage();
        }, 1500);
    }

    showSuccessMessage() {
        // Create and show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">✅</span>
                <div>
                    <div class="font-semibold">Berhasil!</div>
                    <div class="text-sm">WhatsApp akan terbuka untuk mengirim pesan</div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
    new DarkModeManager();
    new PaymentManager();
    new ContactManager();
    new SmoothScrollManager();
    new TestimonialSlider();
    new ScrollToTopManager();
    new PackageModalManager();
});

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes heroPattern {
        0% { transform: translateY(0px); }
        100% { transform: translateY(60px); }
    }

    .animate-fade-in-up {
        animation: fadeInUp 1s ease-out forwards;
        opacity: 0;
    }

    .animate-fade-in {
        animation: fadeIn 1s ease-out forwards;
        opacity: 0;
    }
`;
document.head.appendChild(style);