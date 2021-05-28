//AUTOFILL V.1

// MODE DE EXECUCAO -- DEGUB OU OK 
var EXE = "ok";

//VARIAVEIS
var login_page = "http://mob2b-backend.cloudapp.net/User/LogOn?ReturnUrl=%2fTracker%2fTrackerTicket";
var login_page2 = "http://mob2b-backend.cloudapp.net/User/LogOn?ReturnUrl=%2f";
var home_page = "http://mob2b-backend.cloudapp.net/";
var user = "administrador@amazoncopy.com.br";
var pass = "Wco#$oliveira";
var ticker_page = "http://mob2b-backend.cloudapp.net/Tracker/TrackerTicket";
var buffer_page = "http://mob2b-backend.cloudapp.net/Tracker/TrackerBuffer";


//ESCOLHER FILTRO 
// 1 = ENVIO DE E-MAIL
// 2 = ATENDIMENTOS EM ANELISE
// 3 = ATENDIMENTO PENDENTES

var ctrl_autofill  = 1;	
var ctrl_page = 0;
if(ctrl_autofill==1 || ctrl_autofill==3){
var ctrl_page = ticker_page;
}else if(ctrl_autofill==2){
	var ctrl_page = buffer_page;
}

/////FIM FILTRO ////
////////////// CODIFICAÇÃO /////////////

//=== CODIGO BASE ===

if(window.location.href==login_page || window.location.href==login_page2){
	try{
		document.getElementById("Email").value="administrador@amazoncopy.com.br";
		document.getElementById("Password").value="Wco#$oliveira";
		document.querySelector("body > div.loginContainer > form > div > button").click();
	}catch(e){
	}
}
if(window.location.href==home_page){
	window.location.href = ctrl_page;
}
//ESSE SWITCH MUDA O AUTOFILL
switch(ctrl_autofill){
	// TICKTET PAGE ENVIO DE E-MAIL
	case 1: 
		console.log("Iniciando o serviço");
		if(window.location.href==ctrl_page){
			console.log("Iniciando o serviço de pesquisa de atendimentos fechados");
			document.querySelector("#table > thead > tr > th:nth-child(13)").click();
			document.querySelector("#table > thead > tr > th:nth-child(13)").click();
			var i = 0;
			var loop = setInterval(function(){ 
			console.log("valor de i="+i); 
				if(i == 100){
						clearInterval(loop);
						i=0;
						location.reload();
				   }
				   i++;
				   try{
						console.log(document.querySelector("#table > tbody > tr:nth-child("+i+") > td:nth-child(3)").textContent);
						var k = document.querySelector("#table > tbody > tr:nth-child("+i+") > td:nth-child(3)").textContent;
						var link = document.querySelector("#table > tbody > tr:nth-child("+i+") > td:nth-child(17) > a").href;
						console.log(document.querySelector("#table > tbody > tr:nth-child("+i+") > td:nth-child(17) > a").href);
						var check = localStorage.getItem(k);
						   if(check===null){
							console.log("NG");
							localStorage.setItem(k,link);
							window.open(localStorage.getItem(k));
								localStorage.setItem("atual",link);
							}else{
							console.log("E-mail já enviado");
							}
							   
						   }catch(e){
								location.reload();
						   }
				}, 20000);
		}
		if(window.location.href==localStorage.getItem("atual")){
			console.log("TICKTET PAGE");
				var f = document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a");

				document.querySelector("#tab1 > div > div:nth-child(1) > div:nth-child(2) > div.display-field.col-xs-6.col-sm-8 > div").innerHTML = "";
				var cliente = document.querySelector("#tab1 > div > div:nth-child(1) > div:nth-child(2) > div.display-field.col-xs-6.col-sm-8").outerHTML;
				console.log(cliente);
				var dtcria = document.querySelector("#tab1 > div > div:nth-child(1) > div:nth-child(4) > div.display-field.col-xs-6.col-sm-8").innerHTML;
				console.log(dtcria);
				var dtinicio = document.querySelector("#tab1 > div > div:nth-child(1) > div:nth-child(5) > div.display-field.col-xs-6.col-sm-8").innerHTML;
				var dtfecha = document.querySelector("#tab1 > div > div:nth-child(1) > div:nth-child(6) > div.display-field.col-xs-6.col-sm-8").textContent;

                console.log(dtinicio);
				var k = document.querySelector("#tab1 > div > div:nth-child(1) > div:nth-child(1) > div.display-field.col-xs-6.col-sm-8").innerHTML;
				console.log(k);
				var obs = null;
				var tecnico = null;
				try{
					obs = document.querySelector("#tab1 > div > div:nth-child(1) > div:nth-child(19) > div.display-field.col-xs-6.col-sm-8").innerHTML;
					console.log(obs);
					tecnico = document.querySelector("#tab1 > div > div:nth-child(1) > div:nth-child(18) > div.display-field.col-xs-6.col-sm-8").innerHTML;
					console.log(tecnico);
				}catch(e){
					obs = document.querySelector("#tab1 > div > div:nth-child(1) > div:nth-child(18) > div.display-field.col-xs-6.col-sm-8").innerHTML;
					console.log(obs);
					tecnico = document.querySelector("#tab1 > div > div:nth-child(1) > div:nth-child(17) > div.display-field.col-xs-6.col-sm-8").innerHTML;
					console.log(tecnico);
				};
				
				document.querySelector("#divPortletGalery > div.box-body > div.tab_container.tabbable.header-tabs > ul > li:nth-child(6) > a").click();
				document.querySelector("#teste").click();
				console.log("Enviando o e-mail");
				setTimeout(function() {
				var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
				var email = document.querySelector("#body-form > table > tbody > tr:nth-child(26) > td:nth-child(2)").innerHTML;
				var body = document.querySelector("#body-form").outerHTML;
				var bodyfull = "<h2>Informações sobre o atendimento</h2>" + "<br>Nome do cliente: "  +  cliente   +"<br>Abertura do atendimento: " + dtcria + "<br>" + "Início do atendimento: " + dtinicio + "<br>" + "Fechamento do atendimento: " + dtfecha + "<br>" + "Solicitação: " + obs +"<br>Técnico responsável: "+ tecnico +"<br><br>" + "<h3> Formulário técnico</h3>"+ body + "<br> Em anexo a assinatura do cliente.";
				console.log(email.toLowerCase());
				var qtdanexo = document.getElementsByClassName("img-responsive").length;
				var receiver = null;
				var dtfecha = document.querySelector("#tab1 > div > div:nth-child(1) > div:nth-child(6) > div.display-field.col-xs-6.col-sm-8").textContent;
				console.log(dtfecha);
				console.log("PASSEI DAS VARIAVEIS");
				if(EXE=="DEGUB"){
					receiver = "wellington.oliveira@amazoncopy.com.br";
					
				}else{
					receiver = email.toLowerCase();
				}

				switch(qtdanexo){
					case 5:
						Email.send({
							Host: "email-ssl.com.br",
							Username : "wellington.oliveira@amazoncopy.com.br",
							Password : "We@201020460318",
							To : receiver,
							From : "nao.responda@amazoncopy.com.br",
							Subject : "Atendimento Amazoncopy nº = " + k,	
							Body : bodyfull,
							Attachments : [
								{
								name : "Assinatura.png",
								path : document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142)
								},
								{
								name : "Anexo1.png",
								path : document.getElementsByClassName("img-responsive")[0].src
								},
								{
								name : "Anexo2.png",
								path : document.getElementsByClassName("img-responsive")[1].src
								},
								{
								name : "Anexo3.png",
								path : document.getElementsByClassName("img-responsive")[2].src
								},
								{
								name : "Anexo4.png",
								path : document.getElementsByClassName("img-responsive")[3].src
								},
								{
								name : "Anexo5.png",
								path : document.getElementsByClassName("img-responsive")[4].src
								}
							]
							});
						break;					
					case 4:
						Email.send({
							Host: "email-ssl.com.br",
							Username : "wellington.oliveira@amazoncopy.com.br",
							Password : "We@201020460318",
							To : receiver,
							From : "nao.responda@amazoncopy.com.br",
							Subject : "Atendimento Amazoncopy nº = " + k,	
							Body : bodyfull,
							Attachments : [
								{
								name : "Assinatura.png",
								path : document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142)
								},
								{
								name : "Anexo1.png",
								path : document.getElementsByClassName("img-responsive")[0].src
								},
								{
								name : "Anexo2.png",
								path : document.getElementsByClassName("img-responsive")[1].src
								},
								{
								name : "Anexo3.png",
								path : document.getElementsByClassName("img-responsive")[2].src
								},
								{
								name : "Anexo4.png",
								path : document.getElementsByClassName("img-responsive")[3].src
								}
							]
							});
						break;
					case 3:
						Email.send({
							Host: "email-ssl.com.br",
							Username : "wellington.oliveira@amazoncopy.com.br",
							Password : "We@201020460318",
							To : receiver,
							From : "nao.responda@amazoncopy.com.br",
							Subject : "Atendimento Amazoncopy nº = " + k,	
							Body : bodyfull,
							Attachments : [
								{
								name : "Assinatura.png",
								path : document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142)
								},
								{
								name : "Anexo1.png",
								path : document.getElementsByClassName("img-responsive")[0].src
								},
								{
								name : "Anexo2.png",
								path : document.getElementsByClassName("img-responsive")[1].src
								},
								{
								name : "Anexo3.png",
								path : document.getElementsByClassName("img-responsive")[2].src
								}
							]
							});
						break;
					case 2:
						Email.send({
							Host: "email-ssl.com.br",
							Username : "wellington.oliveira@amazoncopy.com.br",
							Password : "We@201020460318",
							To : receiver,
							From : "nao.responda@amazoncopy.com.br",
							Subject : "Atendimento Amazoncopy nº = " + k,	
							Body : bodyfull,
							Attachments : [
								{
								name : "Assinatura.png",
								path : document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142)
								},
								{
								name : "Anexo1.png",
								path : document.getElementsByClassName("img-responsive")[0].src
								},
								{
								name : "Anexo2.png",
								path : document.getElementsByClassName("img-responsive")[1].src
								}
							]
							});
						break;
					case 1:
						console.log("PASSEI ERRO NO EMAIL 1");
						Email.send({
							Host: "email-ssl.com.br",
							Username : "wellington.oliveira@amazoncopy.com.br",
							Password : "We@201020460318",
							To : receiver,
							From : "nao.responda@amazoncopy.com.br",
							Subject : "Atendimento Amazoncopy nº = " + k,	
							Body : bodyfull,
							Attachments : [
								{
								name : "Assinatura.png",
								path : document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142)
								},
								{
								name : "Anexo1.png",
								path : document.getElementsByClassName("img-responsive")[0].src
								}
							]
							});
						break;
					default:
					Email.send({
							Host: "email-ssl.com.br",
							Username : "wellington.oliveira@amazoncopy.com.br",
							Password : "We@201020460318",
							To : receiver,
							From : "nao.responda@amazoncopy.com.br",
							Subject : "Atendimento Amazoncopy nº = " + k,	
							Body : bodyfull,
							Attachments : [
								{
								name : "Assinatura.png",
								path : document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142)
								},
								{
								name : "Anexo1.png",
								path : document.getElementsByClassName("img-responsive")[0].src
								}
							]
							});	
					break;

						
					}					
						
				message => alert(message)
				}, 10000);
				
				setTimeout(function() {
				window.close();
				}, 60000);
				
		}
	//FIM TICKTET PAGE
	break;
	// BUFFER PAGE
	case 2:
		console.log("Iniciando o serviço BUFFER");
		var i = 0;
		var j = 0;
		var loop = setInterval(function(){ 
		   if(i == 10){
				const ut2 = new SpeechSynthesisUtterance(document.querySelector("#table_info").textContent.substr(18,3).trim());
				var ut = null;
				if(ut2.text=="1"){
					ut = new SpeechSynthesisUtterance(document.querySelector("#table_info").textContent.substr(18,3).trim() + " Atendimento em análise");
					speechSynthesis.speak(ut);
				}else if(ut2.text!="de"){
					ut = new SpeechSynthesisUtterance(document.querySelector("#table_info").textContent.substr(18,3).trim() + " Atendimentos em análise");
					speechSynthesis.speak(ut);
				}
			}
			if(j==120){
				location.reload();
			}
		   console.log("valor de i="+i); 
		   i++;
		   j++;
		}, 1000);
	break;
	//FIM BUFFER PAGE
	// TICKET PAGE CHAMADOS PENDENTES
	case 3:
	
		document.querySelector("#table > thead > tr > th:nth-child(2)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(1)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(6)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(8)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(10)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(11)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(12)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(13)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(14)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(15)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(16)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(17)").style.width='0';
		document.querySelector("#table > thead > tr > th:nth-child(3)").style.width='30';
		document.querySelector("#content > div:nth-child(1) > div > div").style.display='none';
		document.querySelector("#table_wrapper > div:nth-child(1)").style.display='none';
		document.querySelector("#content > div:nth-child(2) > div.col-md-12 > div > div.box-body > button").style.display='none';
		document.querySelector("#header").style.display='none';
		document.querySelector("#table > thead > tr > th:nth-child(4)").textContent="Observação";
		document.querySelector("#table > thead > tr > th:nth-child(5)").click();
		
		var i = 0;
		var j = 0;
		var loop = setInterval(function(){ 
		   if(i == 10){
				if(document.querySelector("#table_wrapper > div:nth-child(3) > div > div.pull-right > div > ul > li.next").className == "next disabled"){
					console.log("Sair");
					location.reload();			
				}else if(j==50){
					console.log("Sair");
					location.reload();	
				}else{
					try{
						console.log("Continuar");
						i=0;
						document.querySelector("#table_wrapper > div:nth-child(3) > div > div.pull-right > div > ul > li.next > a").click();
					}catch(e){
					};
				};	
		   }
		   console.log("valor de i="+i +" Valor de J="+j); 
		   i++;
		   j++;
		}, 2500);		
	break;
	
	
	
	
//FIM SWTICH
};

console.log("Fechando Serviço");

