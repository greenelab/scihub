
export const format = {
  // thanks to https://github.com/customd/jquery-number/blob/master/jquery.number.js#L729
  number: function(number, decimals = 2, decPoint, thousandsSep ) {
    // Set the default values here, instead so we can use them in the replace below.
    thousandsSep	= (typeof thousandsSep === 'undefined') ? ( (1000).toLocaleString() !== '1000' ? (1000).toLocaleString().charAt(1) : '' ) : thousandsSep;
    decPoint		= (typeof decPoint === 'undefined') ? (0.1).toLocaleString().charAt(1) : decPoint;

    // Work out the unicode representation for the decimal place and thousand sep.
    let uDec = ('\\u'+('0000'+(decPoint.charCodeAt(0).toString(16))).slice(-4));
    let uSep = ('\\u'+('0000'+(thousandsSep.charCodeAt(0).toString(16))).slice(-4));

    // Fix the number, so that it's an actual number.
    number = (number + '')
      .replace('\.', decPoint) // because the number if passed in as a float (having . as decimal point per definition) we need to replace this with the passed in decimal point character
      .replace(new RegExp(uSep, 'g'), '')
      .replace(new RegExp(uDec, 'g'), '.')
      .replace(new RegExp('[^0-9+\-Ee.]', 'g'), '');

    let n = !isFinite(+number) ? 0 : +number;
    let s = '';
    let toFixedFix = function(nArg, decimalsArg) {
      return '' + (+(Math.round(('' + nArg).indexOf('e') > 0 ? nArg : nArg + 'e+' + decimalsArg) + 'e-' + decimalsArg));
    };

    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (decimals ? toFixedFix(n, decimals) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousandsSep);
    }
    if ((s[1] || '').length < decimals) {
      s[1] = s[1] || '';
      s[1] += new Array(decimals - s[1].length + 1).join('0');
    }
    return s.join(decPoint);
  },

  percent: (x) => `${format.number(x*100)}%`,

  digits (number, places = 2) {
    if (places === 0) return '';

    return number === 0 || number/Math.pow(10, places - 1) < 1
          ? '0' + format.digits(number, places - 1)
          : number;
  }
};


// thanks to https://stackoverflow.com/a/35316222/763705
export function isString(value) {return typeof value === 'string';}

