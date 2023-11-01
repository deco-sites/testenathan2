export interface propsCurrentStock {
  available: string;
  maxStock: number;
  notifyIsActive: boolean;
}

// FUNÇÃO PARA STOCK

// TODO: Criar tipo de notificação: Texto ou Push
// TODO: Deixar o componente em bloco, para arrastar para qualquer lugar da página.

function SmartNotifyStock(props: propsCurrentStock) {
  // Construir uma chave única com base na URL do produto
  const currentURL = window.location.href;
  const pageKey = `page_${currentURL}`;
  const maxNumberKey = `maxNumber_${currentURL}`;
  const maxStock = props.maxStock;

  const storedValue = localStorage.getItem(pageKey);
  let lastSeenNumber = storedValue !== null ? parseInt(storedValue) : 0;

  if (lastSeenNumber === 0) {
    lastSeenNumber = Math.floor(Math.random() * maxStock) + 1;

    const maxNumberValue = localStorage.getItem(maxNumberKey);
    if (maxNumberValue === null) {
      localStorage.setItem(maxNumberKey, lastSeenNumber.toString());
    }
  }

  const storedValueNumber = localStorage.getItem(maxNumberKey);
  const parsedStoredValueNumber = storedValueNumber !== null
    ? parseInt(storedValueNumber)
    : 1;

  const random = Math.random();
  const maxSubtraction = 4;
  const subtraction = Math.floor(Math.random() * (maxSubtraction + 1));
  const numero = random < 0.5
    ? lastSeenNumber
    : Math.max(1, lastSeenNumber - subtraction);

  if (
    props.available === "https://schema.org/InStock" &&
    props.notifyIsActive === true
  ) {
    const larguraPercentual = (numero / parseInt(storedValueNumber)) * 100;
    const width = `${larguraPercentual}%`;

    localStorage.setItem(pageKey, numero.toString());

    const totalSold = storedValueNumber - numero;

    return (
      <>
        <div class="flex justify-center flex-col items-center">
          <span className="text-gray-700">
            Apenas <span class="text-red-500">{numero}</span>{" "}
            unidades em estoque
          </span>
        </div>

        <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-200">
          <div
            class="bg-red-600 h-2.5 rounded-full dark:bg-red-500"
            style={{ width: width }}
          >
          </div>
        </div>
        <div class="flex justify-center flex-col items-center -mt-4">
          <span className="text-gray-700">
            <span class="text-green-500">{totalSold}</span>{" "}
            vendidos nas últimas horas
          </span>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default SmartNotifyStock;
