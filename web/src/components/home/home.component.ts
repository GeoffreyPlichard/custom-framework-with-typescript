import fs from 'fs';

export class HomeComponent {

  constructor() {
    console.log('ICI HOME');
    const html = fs.readFileSync(__dirname + '/home.component.html', 'utf-8');
    console.log('html', html)

    const templateElement = document.createElement('template');
    // templateElement.content.append(html);
    templateElement.innerHTML = html

  
    console.log('template el', templateElement.content);

    const root = document.getElementById('root');
    root?.append(templateElement.content);
    console.log('root', root);
  }

}