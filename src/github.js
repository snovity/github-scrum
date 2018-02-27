class GitHub {

  constructor() {
    let instance = this;

    $('.project-column').each(function() {
      let $column = $(this);
      let observer = new MutationObserver(() => {
        instance._recalcColumnPoints($column)
      });

      observer.observe(
        $column.find('.js-project-column-cards')[0],
        { attributes: true, childList: true, subtree: true }
      );
    })
  }

  _recalcColumnPoints($column) {
    let totalCards = 0;
    let totalPoints = 0;
    let instance = this;

    $column.find('.project-card').each(function() {
      let $card = $(this);

      if ($card.hasClass('d-none')) return;

      totalCards += 1;
      totalPoints += instance._getCardPoints($card);
    });

    let $counter = $column.find('.js-column-card-count');
    $counter.text(`${totalCards} cards, ${totalPoints} points`);
  }

  _getCardPoints($card) {
    let labels = $card.data('card-label');
    let cardPoints = 0;

    labels.forEach((label) => {
      let components = label.split(' ');
      if (components.length > 1) {
        let second = components[1];

        if (second.includes('point')) {
          cardPoints = parseFloat(components[0]);
        }
      }
    });

    return cardPoints;
  }

}

$(document).ready(() => {
  new GitHub();
});

