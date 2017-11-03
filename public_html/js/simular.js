function simular (prazo, entrada_percentual, valor_conta_energia, valor_consumo = null) {

	var conta_energia,
		conta_energia_estimada,
		tarifa,
		consumo,
		consumo_estimado,
		tx_disponibilidade,
		total_compensado,
		prod_bruta,
		perdas,
		prod_liquida_ano,
		prod_liquida_mes,
		capacidade,
		custo,
		investimento,
		tx_entrada,
		entrada,
		valor_financiado,
		abatimento_conta_energia,
		parcela_financiamento,
		desembolso_mensal,
		diferenca,
		diferenca_percent,
		prazo_meses,
		taxa_mes,
		taxa_ano,
		valor_parcela = null;

	function pmt(rate_per_period, number_of_payments, present_value, future_value, type){
	    if(rate_per_period != 0.0){
	        // Interest rate exists
	        var q = Math.pow(1 + rate_per_period, number_of_payments);
	        return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

	    } else if(number_of_payments != 0.0){
	        // No interest rate, but number of payments exists
	        return -(future_value + present_value) / number_of_payments;
	    }

	    return 0;
	}


	conta_energia = valor_conta_energia; // se opcao for valor da conta em reais
	consumo = valor_consumo; // se opcao for consumo da conta em kilowatt

	tarifa = 0.73;

	if (consumo == null) {
		consumo_estimado = conta_energia/tarifa;
	} else {
		conta_energia = consumo * tarifa
		consumo_estimado = consumo;	
	}

	tx_disponibilidade = 100;
	total_compensado = (consumo_estimado || consumo) - tx_disponibilidade;

	prazo_meses = prazo; // 12, 24, 36, 48, 60
	taxa_mes = 0.016; // == 1.60%
	taxa_ano = Math.pow((1+taxa_mes),12)-1;


	prod_bruta = 1450;
	perdas = 0.03;
	prod_liquida_ano = prod_bruta * (1 - perdas);
	prod_liquida_mes = prod_liquida_ano / 12;
	capacidade = total_compensado / prod_liquida_mes;

	// tabela preço de venda
	if (capacidade > 10 ) {
		custo = 4350;	
	} else if (capacidade > 8 ){
		custo = 4440;
	} else if (capacidade > 6 ){
		custo = 4670;
	} else if (capacidade > 4 ){
		custo = 4780;
	} else if (capacidade > 2 ){
		custo = 5370;
	} else if (capacidade > 0 ){
		custo = 7280;
	} else if (capacidade <= 0) {
		custo = 0;
	}

	investimento = capacidade * custo;

	tx_entrada = entrada_percentual/100; // variável, mínimo 10%
	entrada = investimento * tx_entrada;
	valor_financiado = investimento - entrada;

	valor_parcela = -1*pmt(taxa_mes, prazo_meses, valor_financiado, 0, 0);

	abatimento_conta_energia = tx_disponibilidade * tarifa;
	parcela_financiamento = valor_parcela;
	desembolso_mensal = abatimento_conta_energia + parcela_financiamento;

	diferenca = desembolso_mensal - conta_energia;
	diferenca_percent = diferenca / conta_energia;


	var economia_anual = (total_compensado * tarifa)*12;


	return {
		//investimento: investimento.toFixed(2),
		entrada: entrada.toFixed(2),
		parcela: parcela_financiamento.toFixed(2),
		desembolso_mensal: desembolso_mensal.toFixed(2),
		economia_anual: economia_anual.toFixed()
	};

};

/*function calcular_economia_anual () {

}

function payback () {
	simular(12, 10, 1000)
}*/

//var prazos = [simular(12, 10, 1000), simular(24, 10, 1000), simular(36, 10, 1000), simular(48, 10, 1000), simular(60, 10, 1000)];

//console.log(prazos);


/*console.log("Conta de energia: ", conta_energia.toFixed(2));
console.log("Tarifa: ", tarifa);
console.log("Consumo estimado: ", consumo_estimado.toFixed(2));
console.log("Taxa de disponibilidade: ", tx_disponibilidade);
console.log("Total a ser compensado: ", total_compensado.toFixed(2));

console.log("Prazo (meses): ", prazo_meses);
console.log("Taxa (mes): ", (taxa_mes*100).toFixed(2), "%");
console.log("Taxa (ano): ", (taxa_ano*100).toFixed(2), "%");
console.log("Valor parcela: ", valor_parcela.toFixed(2));

console.log("Produtividade bruta: ", prod_bruta);
console.log("Perdas: ", perdas);
console.log("Produtividade liquida ano: ", prod_liquida_ano.toFixed(2));
console.log("Produtividade liquida mes: ", prod_liquida_mes.toFixed(2));
console.log("Capacidade Sistema: ", capacidade.toFixed(2));
console.log("Custo: ", custo.toFixed(2));
console.log("Investimento total: ", investimento.toFixed(2));

console.log("Custo total: ", custo.toFixed(2));
console.log("Entrada: ", entrada.toFixed(2));
console.log("Valor financiado: ", valor_financiado.toFixed(2));
console.log("Conta de energia: ", abatimento_conta_energia.toFixed(2));
console.log("Parcela financiamento: ", parcela_financiamento.toFixed(2));
console.log("Desembolso mensal: ", desembolso_mensal.toFixed(2));

console.log("Diferenca: ", diferenca.toFixed(2));
console.log("Diferenca em %: ", (diferenca_percent*100).toFixed());*/

/*console.log("Conta de energia: ", conta_energia);
console.log("Conta de energia: ", conta_energia);
console.log("Conta de energia: ", conta_energia);
console.log("Conta de energia: ", conta_energia);
console.log("Conta de energia: ", conta_energia);
console.log("Conta de energia: ", conta_energia);
console.log("Investimento total: ", investimento);
console.log("Parcela financiamento: ", valor_parcela);
console.log("Desembolso mensal: ", desembolso_mensal);*/


////////////////////////