class Pokemon {
  static avatar(src) {
    const officialArtwork = "official-artwork";
    const frontDefault = "front_default";

    return src.sprites.other[officialArtwork][frontDefault];
  }

  static weight(val) {
    return `${val.weight}kg`;
  }

  static abilities(val) {
    return val.abilities.map((item) => item.ability.name);
  }

  static evolutions(val) {
    return val.forms.map((item) => item.name);
  }

  static moves(val) {
    return val.moves.map((item) => item.move.name);
  }

  static aboutUrl(val) {
    return val.species.url;
  }

  static about(val) {
    const lang = "en";

    let enLanguages = val.flavor_text_entries.filter(
      (item) => item.language.name === lang
    );

    return enLanguages.map((item) => item.flavor_text).join("");
  }

  static height(val) {
    return val.height;
  }

  static types(val) {
    return val.types.length
      ? val.types.map((item) => item.type.name.toUpperCase() || "")
      : [];
  }

  static stats(val) {
    return val.stats.map((item) => {
      let newStat = {};

      newStat["base"] = item.base_stat;
      newStat["name"] = item.stat.name;

      return newStat;
    });
  }
}

export default Pokemon;
