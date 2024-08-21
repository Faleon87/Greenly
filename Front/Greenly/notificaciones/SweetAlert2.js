// sweetAlert2Utils.js
export const loadSweetAlert2 = () => {
    return new Promise((resolve, reject) => {
        if (window.Swal) {
            // SweetAlert2 ya está cargado
            resolve(window.Swal);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        script.onload = () => resolve(window.Swal);
        script.onerror = () => reject(new Error('Failed to load SweetAlert2'));
        document.head.appendChild(script);
    });
};
