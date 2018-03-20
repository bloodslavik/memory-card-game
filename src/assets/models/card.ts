export class Card {
  name: string;
  url: string;
  pared: boolean;
  constructor(name: string, folderImage: string) {
    this.name = name;
    this.pared = false;
    this.url = folderImage + name + '.png';
  }
  setUrl(urlFolder: string) {
    this.url = urlFolder + this.name + '.png';
  }
  resetUrl(urlFolder: string) {
    this.url = urlFolder + 'bakeSideCards.png';
  }
  setPaire() {
    this.pared = true;
  }
}

