class Pokemon {
  static avatar(src) {
    const officialArtwork = "official-artwork";
    const frontDefault = "front_default";

    return src.sprites.other[officialArtwork][frontDefault];
  }
}

export default Pokemon;
