export interface propsCurrentStock {
  available: string;
  maxStock: number;
}

// FUNÇÃO PARA STOCK

// TODO: Criar tipo de notificação: Texto ou Push
// TODO: Deixar o componente em bloco, para arrastar para qualquer lugar da página.

function SmartNotifyStock(props: propsCurrentStock) {
  // Construir uma chave única com base na URL do produto
  const currentURL = window.location.href;
  const pageKey = `page_${currentURL}`;
  const maxStock = props.maxStock;

  console.log(maxStock);

  // Recuperar o valor armazenado no localstorage para o produto específico
  const storedValue = localStorage.getItem(pageKey);
  let lastSeenNumber = storedValue !== null ? parseInt(storedValue) : 0;

  // Se o valor for 0 (ou seja, não há um valor anterior), gera um número aleatório entre 1 e 10.
  if (lastSeenNumber === 0) {
    lastSeenNumber = Math.floor(Math.random() * maxStock) + 1;
  }
  // Gerar um número menor ou igual ao valor armazenado, mas não menor que 1 e com 50% de probabilidade de abaixar o valor do estoque.
  const random = Math.random();
  const maxSubtraction = 4;
  const subtraction = Math.floor(Math.random() * (maxSubtraction + 1)); // Gera um valor entre 0 e 4
  const numero = random < 0.5
    ? lastSeenNumber
    : Math.max(1, lastSeenNumber - subtraction);

  if (props.available === "https://schema.org/InStock") {
    localStorage.setItem(pageKey, numero.toString());

    return (
      <div class="text-red-600 flex justify-center">
        Últimas {numero} unidades em estoque
      </div>
    );
  } else {
    return <></>;
  }
}

export default SmartNotifyStock;
