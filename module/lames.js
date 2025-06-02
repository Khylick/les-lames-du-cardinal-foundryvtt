Hooks.once("init", async function () {
  console.log("Les Lames du Cardinal | Initialisation du système");

  CONFIG.Actor.documentClass = LamesActor;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("les-lames-du-cardinal", LamesCharacterSheet, {
    types: ["character"],
    makeDefault: true
  });
});

class LamesActor extends Actor {
  prepareData() {
    super.prepareData();
    // Ajoute ici tes calculs de données plus tard
  }
}

class LamesCharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["les-lames", "sheet", "actor"],
      template: "systems/les-lames-du-cardinal/templates/actor/character-sheet.hbs",
      width: 600,
      height: 700,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  getData() {
    const context = super.getData();
    return context;
  }
}
