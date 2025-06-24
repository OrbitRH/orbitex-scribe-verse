
-- Inserir primeiro colaborador - Maria Silva (Desenvolvedora Frontend)
INSERT INTO colaboradores (
    nome_completo,
    cpf,
    rg,
    data_nascimento,
    estado_civil,
    sexo,
    nacionalidade,
    naturalidade,
    email_pessoal,
    email_corporativo,
    telefone_principal,
    telefone_secundario,
    endereco_completo,
    data_admissao,
    status,
    tipo_contrato,
    salario_base,
    cargo_id,
    filial_id,
    horario_trabalho_id,
    observacoes,
    documentos,
    dados_bancarios,
    contatos_emergencia
) VALUES (
    'Maria Silva Santos',
    '12345678901',
    '123456789',
    '1990-05-15',
    'solteiro',
    'feminino',
    'Brasileira',
    'São Paulo - SP',
    'maria.silva@email.com',
    'maria.silva@orbitex.com',
    '(11) 99999-1234',
    '(11) 3333-5678',
    '{
        "logradouro": "Rua das Flores",
        "numero": "123",
        "complemento": "Apto 45",
        "bairro": "Centro",
        "cidade": "São Paulo",
        "estado": "SP",
        "cep": "01234-567"
    }',
    '2023-03-15',
    'ativo',
    'clt',
    6500.00,
    (SELECT id FROM cargos WHERE codigo = 'DEV-FE'),
    (SELECT id FROM filiais WHERE codigo = 'MATRIZ'),
    (SELECT id FROM horarios_trabalho WHERE nome = 'Horário Flexível'),
    'Desenvolvedora experiente em React e TypeScript',
    '{
        "ctps": "1234567890",
        "pis": "12345678901",
        "titulo_eleitor": "123456789012",
        "reservista": null
    }',
    '{
        "banco": "001",
        "agencia": "1234",
        "conta": "56789-0",
        "tipo_conta": "corrente"
    }',
    '[
        {
            "nome": "João Silva Santos",
            "parentesco": "pai",
            "telefone": "(11) 98888-7777",
            "endereco": "Rua das Palmeiras, 456 - Centro - São Paulo/SP"
        }
    ]'
);

-- Inserir segundo colaborador - Carlos Oliveira (Analista de RH)
INSERT INTO colaboradores (
    nome_completo,
    cpf,
    rg,
    data_nascimento,
    estado_civil,
    sexo,
    nacionalidade,
    naturalidade,
    email_pessoal,
    email_corporativo,
    telefone_principal,
    endereco_completo,
    data_admissao,
    status,
    tipo_contrato,
    salario_base,
    cargo_id,
    filial_id,
    horario_trabalho_id,
    observacoes,
    documentos,
    dados_bancarios,
    contatos_emergencia
) VALUES (
    'Carlos Roberto Oliveira',
    '98765432100',
    '987654321',
    '1985-08-22',
    'casado',
    'masculino',
    'Brasileira',
    'Rio de Janeiro - RJ',
    'carlos.oliveira@email.com',
    'carlos.oliveira@orbitex.com',
    '(21) 99888-5432',
    '{
        "logradouro": "Avenida Brasil",
        "numero": "789",
        "complemento": "Casa 2",
        "bairro": "Copacabana",
        "cidade": "Rio de Janeiro",
        "estado": "RJ",
        "cep": "22070-011"
    }',
    '2022-01-10',
    'ativo',
    'clt',
    4200.00,
    (SELECT id FROM cargos WHERE codigo = 'ANL-RH'),
    (SELECT id FROM filiais WHERE codigo = 'MATRIZ'),
    (SELECT id FROM horarios_trabalho WHERE nome = 'Horário Comercial'),
    'Analista com 5 anos de experiência em RH',
    '{
        "ctps": "9876543210",
        "pis": "98765432100",
        "titulo_eleitor": "987654321098",
        "reservista": "A123456"
    }',
    '{
        "banco": "033",
        "agencia": "5678",
        "conta": "12345-6",
        "tipo_conta": "corrente"
    }',
    '[
        {
            "nome": "Ana Paula Oliveira",
            "parentesco": "esposa",
            "telefone": "(21) 97777-8888",
            "endereco": "Avenida Brasil, 789 - Casa 2 - Copacabana - Rio de Janeiro/RJ"
        },
        {
            "nome": "Roberto Oliveira",
            "parentesco": "pai",
            "telefone": "(21) 96666-9999",
            "endereco": "Rua do Sol, 321 - Tijuca - Rio de Janeiro/RJ"
        }
    ]'
);

-- Verificar se os colaboradores foram inseridos corretamente
SELECT 
    matricula,
    nome_completo,
    email_corporativo,
    status,
    c.titulo as cargo,
    data_admissao
FROM colaboradores col
LEFT JOIN cargos c ON col.cargo_id = c.id
WHERE col.created_at >= NOW() - INTERVAL '1 minute'
ORDER BY col.created_at DESC;
