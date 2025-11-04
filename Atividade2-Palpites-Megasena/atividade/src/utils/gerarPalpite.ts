/**
 * Gera um palpite de 6 números únicos para a Mega-Sena,
 * ordenados e formatados com dois dígitos.
 * * @returns Um array de strings, ex: ["04", "12", "22", "35", "40", "55"]
 */
export function gerarPalpite(): string[] {
  const numerosUnicos = new Set<number>();

  // 1. Garante 6 números únicos
  while (numerosUnicos.size < 6) {
    // 2. Gera um número aleatório entre 1 e 60
    const numeroAleatorio = Math.floor(Math.random() * 60) + 1;
    // 3. Adiciona ao Set (só adiciona se for único)
    numerosUnicos.add(numeroAleatorio);
  }

  // 4. Converte o Set para um Array
  const numerosArray = Array.from(numerosUnicos);

  // 5. Ordena os números
  const numerosOrdenados = numerosArray.sort((a, b) => a - b);

  // 6. Formata para string com dois dígitos (ex: 5 -> "05")
  const palpiteFormatado = numerosOrdenados.map(num => 
    num.toString().padStart(2, '0')
  );

  // 7. Retorna o palpite
  return palpiteFormatado;
}