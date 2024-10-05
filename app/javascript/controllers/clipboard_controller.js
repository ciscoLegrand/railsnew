import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["source", "button"];
  static values = {
    locales: Object
  }

  copyToClipboard() {
    const text = this.sourceTarget.innerText.replace(/^\$\s*/, '');

    navigator.clipboard.writeText(text).then(() => {
      console.log('Texto copiado al portapapeles:', this.localesValue.message);
      this.showNotification(this.localesValue.message);
      this.buttonTarget.textContent = this.localesValue.copied;

      setTimeout(() => {
        this.buttonTarget.textContent = this.localesValue.copy;
      }, 2000);
    }).catch(err => {
      console.error('Error: ', err);
    });
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg ease-in-out duration-500';
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
}
