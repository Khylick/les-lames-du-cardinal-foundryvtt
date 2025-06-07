import { LamesActor } from "./actor/LamesActor.js";
import { LamesCharacterSheet } from "./actor/LamesSheet.js";

Hooks.once("init", async function () {
    console.log("Les Lames du Cardinal | Initialisation du système");

    CONFIG.Actor.documentClass = LamesActor;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("les-lames-du-cardinal", LamesCharacterSheet, {
        types: ["pj"],
        makeDefault: true
    });

    // Charger le contenu du fichier et l'enregistrer sous un nom court
    const profilCard = await fetch("systems/les-lames-du-cardinal/templates/partials/profil-card.hbs").then(r => r.text());
    const modal = await fetch("systems/les-lames-du-cardinal/templates/partials/profil-selection-modal.hbs").then(r => r.text());

    Handlebars.registerPartial("partials/profil-card", profilCard);
    Handlebars.registerPartial("profil-selection-modal", modal);
});
