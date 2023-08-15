import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const confirmColor = "#367CFF";

export default {
    swalError
}

async function swalError({ status = "", buttonText = "OK" } = {}) {
    const textError = status == 404 ? 'Personagem Não encontrado ou inexistente' : 'Erro desconhecido, tente novamente mais tarde'
    return await Swal.fire({
        title: "Oops!",
        html: textError,
        icon: "error",
        confirmButtonText: buttonText,
        confirmButtonColor: confirmColor,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        focusConfirm: false,
        customClass: "swal2-custom",
    });
}