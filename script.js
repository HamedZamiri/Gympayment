document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('paymentForm');
    const membershipRadios = document.querySelectorAll('input[name="membershipType"]');
    const customAmountSection = document.getElementById('customAmountSection');
    const customAmountInput = document.getElementById('customAmount');
    const finalAmountDisplay = document.getElementById('finalAmount');
    const paymentButton = document.getElementById('paymentButton');
    const buttonText = document.getElementById('buttonText');

    // قیمت‌های عضویت
    const membershipPrices = {
        'daily': 750000,
        'daily-treadmill': 850000,
        'alternate': 600000,
        'alternate-treadmill': 680000
    };

    // فرمت کردن قیمت به فارسی
    function formatPrice(price) {
        return new Intl.NumberFormat('en-US').format(price);
    }

    // به‌روزرسانی مبلغ نهایی
    function updateFinalAmount() {
        const selectedMembership = document.querySelector('input[name="membershipType"]:checked');
        
        if (!selectedMembership) {
            finalAmountDisplay.textContent = 'انتخاب نشده';
            paymentButton.disabled = true;
            buttonText.textContent = 'پرداخت';
            return;
        }

        let amount = 0;
        
        if (selectedMembership.value === 'custom') {
            amount = parseInt(customAmountInput.value) || 0;
        } else {
            amount = membershipPrices[selectedMembership.value] || 0;
        }

        if (amount > 0) {
            finalAmountDisplay.textContent = `${formatPrice(amount)} تومان`;
            paymentButton.disabled = false;
            buttonText.textContent = `پرداخت ${formatPrice(amount)} تومان`;
        } else {
            finalAmountDisplay.textContent = selectedMembership.value === 'custom' ? 'مبلغ وارد نشده' : 'انتخاب نشده';
            paymentButton.disabled = true;
            buttonText.textContent = 'پرداخت';
        }
    }

    // رویداد تغییر نوع عضویت
    membershipRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'custom') {
                customAmountSection.style.display = 'block';
                document.getElementById('amountDisplay').style.display = 'none';
            } else {
                customAmountSection.style.display = 'none';
                document.getElementById('amountDisplay').style.display = 'block';
                customAmountInput.value = '';
            }
            updateFinalAmount();
        });
    });

    // رویداد تغییر مبلغ دلخواه
    customAmountInput.addEventListener('input', updateFinalAmount);

    // رویداد ارسال فرم
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const fullName = formData.get('fullName');
        const phoneNumber = formData.get('phoneNumber');
        const selectedMembership = document.querySelector('input[name="membershipType"]:checked');
        
        if (!fullName || !phoneNumber || !selectedMembership) {
            alert('لطفاً تمام فیلدها را پر کنید');
            return;
        }

        let amount = 0;
        if (selectedMembership.value === 'custom') {
            amount = parseInt(customAmountInput.value) || 0;
        } else {
            amount = membershipPrices[selectedMembership.value] || 0;
        }

        if (amount <= 0) {
            alert('لطفاً مبلغ معتبری وارد کنید');
            return;
        }

        // شبیه‌سازی انتقال به درگاه پرداخت
        alert(`در حال انتقال به درگاه پرداخت برای مبلغ ${formatPrice(amount)} تومان`);
        
        // اینجا می‌توانید کد انتقال به درگاه پرداخت واقعی را اضافه کنید
        console.log('اطلاعات پرداخت:', {
            fullName,
            phoneNumber,
            membershipType: selectedMembership.value,
            amount
        });
    });

    // اولین بار به‌روزرسانی
    updateFinalAmount();
});