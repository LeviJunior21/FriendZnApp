function formatTimeDifference(differenceInMilliseconds: number): string {
    const segundos = Math.floor(differenceInMilliseconds / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
  
    if (semanas >= 2) {
      return `${semanas} semanas atrás`;
    } else if (semanas === 1) {
      return '1 semana atrás';
    } else if (dias >= 2) {
      return `${dias} dias atrás`;
    } else if (dias === 1) {
      return '1 dia atrás';
    } else if (horas >= 2) {
      return `${horas} horas atrás`;
    } else if (horas === 1) {
      return '1 hora atrás';
    } else if (minutos >= 2) {
      return `${minutos} minutos atrás`;
    } else if (minutos === 1) {
      return '1 minuto atrás';
    } else {
      return 'agora há pouco';
    }
};

export function getCurrentDate(date: Date): string {
    const currentTime = new Date();
    const differenceByTime = currentTime.getTime() - date.getTime();
    return formatTimeDifference(differenceByTime);
}