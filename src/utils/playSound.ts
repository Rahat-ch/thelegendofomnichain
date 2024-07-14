const playSound = (source: string) => {
  const sound = new Audio(source);
  sound.play();
};

export default playSound;
