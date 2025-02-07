document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.featured-section');
    let currentSlide = 0;

    function showSlide(index) {
        // Remove all classes first
        slides.forEach(slide => {
            slide.classList.remove('active', 'previous');
        });
        
        // Add previous class to the last active slide
        const prevIndex = (index - 1 + slides.length) % slides.length;
        slides[prevIndex].classList.add('previous');
        
        // Show current slide
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Start the slideshow
    setInterval(nextSlide, 3000);
});
