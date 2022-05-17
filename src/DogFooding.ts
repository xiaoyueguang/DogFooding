import html2canvas from 'html2canvas';
import { createFloatButton } from './shared';
import './style.css'

class DogFooding {
  elem: HTMLElement;

  constructor(elem: HTMLElement = document.body) {
    this.elem = elem;

    const button = createFloatButton();
    button.addEventListener('click', this.snapshot.bind(this));
  }

  async snapshot() {
    const elem = this.elem;
    const canvas = await html2canvas(elem, {
      ignoreElements: (elem) => {
        return elem.className.includes('dog-fooding')
      },
    });

    const wrap = document.createElement('div');
    wrap.className = 'dog-fooding-snapshot';
    wrap.appendChild(canvas);

    document.body.appendChild(wrap);

    const form = this.createForm();

    this.tick(wrap, form);
  }

  createForm() {
    const form = document.createElement('div');
    form.className = 'dog-fooding-form';
    document.body.appendChild(form);

    form.appendChild(this.renderForm());

    return form;
  }

  tick(wrap: HTMLElement, form: HTMLElement) {
    Promise.resolve().then(() => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;

      form.style.transform = 'translate(0, 0)';

      const styleWidth = width - 336;
      const styleHeight = styleWidth *  height / width;
      const styleTop = (height - styleHeight) / 2;
      wrap.style.width = `${styleWidth}px`;
      wrap.style.height = `${styleHeight}px`;
      wrap.style.top = `${styleTop}px`;
    });
  }

  getBaseInfo() {
    const ua = navigator.userAgent
    const href = location.href;

    return {
      ua, href
    };
  }

  renderForm() {
    const baseInfo = this.getBaseInfo();
    const keys = Object.keys(baseInfo) as Array<keyof ReturnType<typeof this.getBaseInfo>>;

    const form = document.createElement('form');

    keys.forEach(key => {
      const elem = document.createElement('div');
      const label = document.createElement('label');
      label.innerText = key;

      const input = document.createElement('input');
      input.disabled = true;
      input.value = baseInfo[key];

      elem.appendChild(label)
      elem.appendChild(input);

      form.appendChild(elem);
    })

    return form;
  }
}

export default DogFooding
