const converteDateToAge = (date: string) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(date)) {
        throw new Error("Formato de data inválido. Use o formato DD/MM/YYYY.");
    }

    const [day, month, year] = date.split('/').map(Number);

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
        age--;
    }

    return age;
}

export default converteDateToAge