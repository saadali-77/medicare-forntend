const storageKey = (email: string) => `avatar:${email.toLowerCase()}`;

export const loadAvatar = (email: string) => {
  try {
    return localStorage.getItem(storageKey(email)) ?? undefined;
  } catch {
    return undefined;
  }
};

export const saveAvatar = (email: string, avatar?: string) => {
  try {
    if (avatar) {
      localStorage.setItem(storageKey(email), avatar);
    } else {
      localStorage.removeItem(storageKey(email));
    }
  } catch {
    // storage unavailable or full; the avatar stays in memory for this session
  }
};
