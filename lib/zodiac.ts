export function getZodiacSign(month: number, day: number): string {
  const zodiacs = [
    { name: 'Capricorn', startMonth: 12, startDay: 22 },
    { name: 'Aquarius', startMonth: 1, startDay: 20 },
    { name: 'Pisces', startMonth: 2, startDay: 19 },
    { name: 'Aries', startMonth: 3, startDay: 21 },
    { name: 'Taurus', startMonth: 4, startDay: 20 },
    { name: 'Gemini', startMonth: 5, startDay: 21 },
    { name: 'Cancer', startMonth: 6, startDay: 21 },
    { name: 'Leo', startMonth: 7, startDay: 23 },
    { name: 'Virgo', startMonth: 8, startDay: 23 },
    { name: 'Libra', startMonth: 9, startDay: 23 },
    { name: 'Scorpio', startMonth: 10, startDay: 23 },
    { name: 'Sagittarius', startMonth: 11, startDay: 22 },
  ];

  for (let i = 0; i < zodiacs.length; i++) {
    const current = zodiacs[i];
    const next = zodiacs[(i + 1) % zodiacs.length];

    let isInRange = false;

    if (current.startMonth === month) {
      isInRange = day >= current.startDay;
    } else if (next.startMonth === month) {
      isInRange = day < next.startDay;
    }

    if (isInRange) {
      return current.name;
    }
  }

  return 'Capricorn';
}

export function calculateLifePathNumber(dateOfBirth: string): number {
  const date = new Date(dateOfBirth);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const sumDigits = (num: number): number => {
    return num
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  };

  let sum = sumDigits(month) + sumDigits(day) + sumDigits(year);
  while (sum > 9) {
    sum = sumDigits(sum);
  }
  return sum;
}

export function calculateDestinyNumber(fullName: string): number {
  const letterValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  };

  let sum = 0;
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');

  for (const char of cleanName) {
    sum += letterValues[char] || 0;
  }

  while (sum > 9) {
    sum = sum
      .toString()
      .split('')
      .reduce((s, digit) => s + parseInt(digit), 0);
  }

  return sum;
}
