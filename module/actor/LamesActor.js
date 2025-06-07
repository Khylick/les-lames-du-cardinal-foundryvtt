export class LamesActor extends Actor {
    prepareData() {
        super.prepareData();

        // Initialise l'ensemble vitalite/tenacite
        if (!this.system.vitaliteTenacite || !Array.isArray(this.system.vitaliteTenacite)) {
            this.updateSource({
                "system.vitaliteTenacite": Array(8).fill("empty")
            });
        }

        // Initialise les profils
        if (!this.system.profilsChoisis || !Array.isArray(this.system.profilsChoisis)) {
            this.updateSource({
                "system.profilsChoisis": []
            });
        }

        // Initialise la valeur "Occultisme"
        if (!this.system.occultisme) {
            this.updateSource({ "system.occultisme": "" });
        }
        // Initialise la valeur "Armes"
        if (!this.system.armes) {
            this.updateSource({ "system.armes": "" });
        }

    }
}