class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const fullTxt = this.words[this.wordIndex % this.words.length];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = this.isDeleting ? 150 : 300;

        if (!this.isDeleting && this.txt === fullTxt) {
            this.isDeleting = true;
            typeSpeed = this.wait;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);
});
