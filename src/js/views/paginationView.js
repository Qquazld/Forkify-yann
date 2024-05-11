import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _currentPage;
  _numPages;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;

      const goTo = +btn.dataset.goto;
      handler(goTo);
    });
  }

  _generateMarkup() {
    this._numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    this._currentPage = this._data.page;

    // Page 1 + other pages
    if (this._data.page === 1 && this._numPages > 1) {
      return [
        this._generateButtonMarkup('next'),
        this._generateNumPageMarkup('firstPage'),
      ].join('');
    }
    // Last page
    if (this._data.page === this._numPages && this._numPages > 1) {
      return [
        this._generateButtonMarkup('prev'),
        this._generateNumPageMarkup('lastPage'),
      ].join('');
    }
    // Other page
    if (this._data.page < this._numPages) {
      return [
        this._generateButtonMarkup('next'),
        this._generateButtonMarkup('prev'),
        this._generateNumPageMarkup('center'),
      ].join('');
    }
    // Only page 1
    // if (this._data.page === 1 && numPages < 2)
    return '';
  }

  _generateButtonMarkup(button) {
    if (button === 'next') {
      return `<button data-goto="${
        this._currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>${this._currentPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    if (button === 'prev') {
      return `<button data-goto="${
        this._currentPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
    <span>${this._currentPage - 1}</span>
    </button>`;
    }
  }
  _generateNumPageMarkup(button) {
    if (button === 'center') {
      return `<button data-goto="${this._currentPage}" class="btn--inline pagination__btn--center" disabled style="pointer-events: none;">
    <span>${this._currentPage}</span>
  </button>`;
    }
    if (button === 'firstPage') {
      return `<button class="btn--inline pagination__btn--prev" disabled style="pointer-events: none;">
      <span>${this._currentPage}</span>
    </button>`;
    }
    if (button === 'lastPage') {
      return `<button class="btn--inline pagination__btn--next" disabled style="pointer-events: none;">
      <span>${this._currentPage}</span>
    </button>`;
    }
  }
}

export default new PaginationView();
