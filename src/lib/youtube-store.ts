// Este store existe fora do ciclo de vida do React e persiste entre navegações

let currentVideoId: string | null = null;
const videos = ['BS46C2z5lVE', 'htgr3pvBr-I', 'XEjLoHdbVeE', 'Zi_XLOBDo_Y', 'zTDeEJyCmNA'];

// Callbacks para notificar componentes sobre mudanças
const listeners: Set<(id: string) => void> = new Set();

// Inicializa o vídeo do armazenamento local ou seleciona um novo
export function initializeVideo(): string {
  // Se já temos um ID, use-o
  if (currentVideoId) return currentVideoId;
  
  // Tente obter do localStorage
  if (typeof window !== 'undefined') {
    try {
      const storedData = localStorage.getItem('youtubeVideoData');
      if (storedData) {
        const { id, timestamp } = JSON.parse(storedData);
        const currentTime = Date.now();
        const expirationTime = 1000 * 60 * 60 * 2; // 2 horas
        
        if (id && timestamp && currentTime - timestamp < expirationTime) {
          currentVideoId = id;
          return id;
        }
      }
    } catch (error) {
      console.error('Erro ao processar dados do vídeo:', error);
    }
  }
  
  // Selecione um novo vídeo aleatório
  const randomIndex = Math.floor(Math.random() * videos.length);
  const newId = videos[randomIndex];
  currentVideoId = newId;
  
  // Salve no localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('youtubeVideoData', JSON.stringify({
      id: newId,
      timestamp: Date.now()
    }));
  }
  
  return newId;
}

// Carrega um novo vídeo
export function loadNewVideo(): string {
  // Filtra o vídeo atual
  const filteredVideos = videos.filter(id => id !== currentVideoId);
  const randomIndex = Math.floor(Math.random() * filteredVideos.length);
  const newId = filteredVideos[randomIndex];
  currentVideoId = newId;
  
  // Salve no localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('youtubeVideoData', JSON.stringify({
      id: newId,
      timestamp: Date.now()
    }));
  }
  
  // Notifique os ouvintes
  listeners.forEach(listener => listener(newId));
  
  return newId;
}

// Função para assinar às mudanças de vídeo
export function subscribeToVideoChanges(callback: (id: string) => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

// Obter o ID atual do vídeo
export function getCurrentVideoId(): string {
  if (!currentVideoId) {
    return initializeVideo();
  }
  return currentVideoId;
}