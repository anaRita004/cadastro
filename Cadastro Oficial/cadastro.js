document.addEventListener('DOMContentLoaded', function() {
    // Função para capitalizar a primeira letra e permitir apenas letras no nome e sobrenome
    function formatarTexto(event) {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); // Permite apenas letras e espaços
        this.value = this.value.replace(/(^|\s)\S/g, function(letter) {
            return letter.toUpperCase();
        }); // Capitaliza a primeira letra de cada palavra
    }

    // Função para formatar e validar o número de celular
    const celularInput = document.getElementById('number');
    celularInput.addEventListener('input', function(event) {
        let valor = this.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d+)/, '($1) $2'); // Adiciona o formato (xx) 
        }
        if (valor.length > 9) {
            valor = valor.replace(/(\d{4})(\d+)/, '$1-$2'); // Adiciona o formato xxxx-xxxx
        }

        this.value = valor.slice(0, 14); // Limita o total de caracteres a 14
    });

    // Função para validar o e-mail
    function validarEmail(email) {
        return email.includes('@');
    }

    // Função para verificar o preenchimento dos campos e se as senhas coincidem
    document.querySelector('form').addEventListener('submit', function(event) {
        const primeiroNome = document.getElementById('firstname').value.trim();
        const sobrenome = document.getElementById('lastname').value.trim();
        const email = document.getElementById('email').value.trim();
        const celular = celularInput.value.trim();
        const senha = document.getElementById('password').value;
        const confirmarSenha = document.getElementById('confirmPassword').value;
        const generoSelecionado = document.querySelector('input[name="genero"]:checked');

        // Verifica se todos os campos estão preenchidos
        if (!primeiroNome || !sobrenome || !email || !celular || !senha || !confirmarSenha || !generoSelecionado) {
            alert('Por favor, preencha todos os campos corretamente e selecione um gênero.');
            event.preventDefault(); // Impede o envio do formulário
            return;
        }

        // Verifica se o e-mail contém o arroba
        if (!validarEmail(email)) {
            alert('O e-mail deve conter um arroba (@).');
            event.preventDefault(); // Impede o envio do formulário
            return;
        }

        // Verifica se o celular tem exatamente 10 dígitos (considerando a máscara)
        const celularLimpo = celular.replace(/\D/g, '');
        if (celularLimpo.length !== 10) {
            alert('O celular deve conter exatamente 10 dígitos.');
            event.preventDefault(); // Impede o envio do formulário
            return;
        }

        // Verifica se as senhas coincidem
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            event.preventDefault(); // Impede o envio do formulário
            return;
        }
        
        // Se todas as validações passarem, redireciona para a próxima página
        window.location.href = 'proxima_pagina.html'; // Altere para a URL da próxima página
    });

    // Adiciona eventos de input para formatar o nome e sobrenome
    document.getElementById('firstname').addEventListener('input', formatarTexto);
    document.getElementById('lastname').addEventListener('input', formatarTexto);
});
