function percentage(val1, val2) {

	var menor = val2;
	var maior = val1;
	var sign = -1;

	if (val1 < val2) {
		menor = val1;
		maior = val2;
		sign = 1;
	}

	var times = menor / maior;
	var difference = (times - 1);

	return sign * (difference * 100);
}
function price(prices) {
	
	function MyCoin(name, amount, purchase_price, reais_spent, price) {
		var self = this;
		self.name = name;
		self.reais_spent = reais_spent;
		self.btc_spent = (purchase_price * amount);
		self.amount = amount;
		self.price = price;
		self.purchase_price = purchase_price;
		self.appreciation = function () {
			return (self.price - self.purchase_price);
		};
		self.appreciationPercentage = function () {
			return percentage(self.price, self.purchase_price).toFixed(2);
		};
		self.appreciationColor = function () {
			return ((self.appreciation() > 0) ? 'green' : 'red');
		};
	}

	coins = [
		new MyCoin('Cardano - ADA', 111, 0.00005900, 250, prices.ada),
		new MyCoin('Cardano - ADA', 165, 0.00002105, 100, prices.ada),
		new MyCoin('Tron - TRX', 1, 0.0000049, 0, prices.trx),
		new MyCoin('Cardano - ADA', 310, 0.0000525, 600, prices.ada),
		new MyCoin('Cardano - ADA', 88, 0.00002082, 50, prices.ada),
	];

	var header = [
		'Coin',
		'BRL Spent',
		'BRL',
		'Profit',
		'Bitcoin Spent',
		'Amount',
		'Current Price',
		'Purchase Price',
		'Current - Purchase',
		'Current - Purchase',
		'USDT',		
	];
	
	var content = $('#content');
	content.empty();

	var header_element = $('<tr></tr>');
	for (var i in header) {
		header_element.append('<th>' + header[i] + '</th>');
	}
	content.append(header_element);
	
	for (var i in coins) {
	
		var usdt = (coins[i].amount * coins[i].price) * prices.usdt;
		var brl = (usdt * prices.usd_brl).toFixed(2);
	
		var tr = $('<tr/>');
		var td = $('<td/>');		
		
		tr.append(td.clone().text(coins[i].name));
		tr.append(td.clone().text('R$ ' + coins[i].reais_spent));
		tr.append(td.clone().text('R$ ' + brl));
		tr.append(td.clone().text('R$ ' + (brl - coins[i].reais_spent).toFixed(2)));
		tr.append(td.clone().text(coins[i].btc_spent));
		tr.append(td.clone().text(coins[i].amount).addClass('text-center'));
		tr.append(td.clone().text(coins[i].price).addClass('text-center'));
		tr.append(td.clone().text(coins[i].purchase_price.toFixed(8)).addClass('text-center'));
		tr.append(td.clone().text(coins[i].appreciation().toFixed(8)).addClass('text-center').addClass('font-' + coins[i].appreciationColor()));
		tr.append(td.clone().text(coins[i].appreciationPercentage() + ' %').addClass('center-block badge bg-' + coins[i].appreciationColor()));
		tr.append(td.clone().text('$ ' + usdt.toFixed(2)));
		
		content.append(tr);
	}
	
	console.log('Atualizando');
}
function ajax() {

	$.when(
		$.getJSON('https://api.binance.com/api/v1/ticker/price?symbol=ADABTC'), 
		$.getJSON('https://api.binance.com/api/v1/ticker/price?symbol=TRXBTC'), 
		$.getJSON('https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT'), 
		$.getJSON('http://economia.awesomeapi.com.br/USD-BRL/1')
	).done(function (data_ada, data_trx, data_usdt, data_brl_usd) {
		
				var usd_brl_infor = data_brl_usd[0][0];
				var usd_brl_high = parseFloat(usd_brl_infor.high);
				var usd_brl_low = parseFloat(usd_brl_infor.low);
				usd_brl_avg = (usd_brl_high + usd_brl_low) / 2;
				
				prices = {
					'ada': data_ada[0].price,
					'trx': data_trx[0].price,
					'usdt': data_usdt[0].price,
					'usd_brl': usd_brl_avg,
				};
				price(prices);
			}
			);
}
t = window.setInterval(ajax, 1000);