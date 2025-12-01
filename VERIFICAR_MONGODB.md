# 📊 Verificar Dados no MongoDB

## 🚀 Passo 1: Verificar se MongoDB está rodando

```powershell
# Testar conexão com MongoDB
mongosh --eval "db.adminCommand('ping')"

# Se retornar { ok: 1 }, está funcionando ✅
```

---

## 🔍 Passo 2: Acessar os dados via Terminal

```powershell
# Conectar ao MongoDB
mongosh

# Selecionar banco de dados
use currency_converter

# Ver todas as coleções
show collections

# ✅ Você deve ver:
# conversions
# suggestions
# users
```

---

## 📋 Passo 3: Verificar Sugestões

```powershell
# Listar todas as sugestões
db.suggestions.find()

# Ver quantas sugestões existem
db.suggestions.countDocuments()

# Ver sugestões de um usuário específico
db.suggestions.find({ autor: ObjectId("ID_DO_USUARIO") })

# Exemplo de documento esperado:
# {
#   _id: ObjectId("..."),
#   moeda: "Bitcoin",
#   pais: "El Salvador",
#   autor: ObjectId("..."),
#   createdAt: ISODate("2025-12-01T10:30:00Z")
# }
```

---

## 💱 Passo 4: Verificar Conversões

```powershell
# Listar todas as conversões
db.conversions.find()

# Ver quantas conversões existem
db.conversions.countDocuments()

# Ver conversões de um usuário
db.conversions.find({ userId: ObjectId("ID_DO_USUARIO") })

# Exemplo de documento esperado:
# {
#   _id: ObjectId("..."),
#   userId: ObjectId("..."),
#   from: "USD",
#   to: "BRL",
#   amount: 100,
#   rate: 4.97,
#   converted: 497,
#   createdAt: ISODate("2025-12-01T10:35:00Z")
# }
```

---

## 📊 Passo 5: Ver logs no Backend

Após executar ações na aplicação, verifique os logs:

```
[SUGESTÃO] POST - Usuário: 123, Moeda: Bitcoin, País: El Salvador
[SUGESTÃO] ✅ Salva com sucesso - ID: 507f1f77bcf86cd799439011

[CONVERSÃO] POST - Usuário: 123, USD → BRL, Valor: 100
[CONVERSÃO] ✅ Salva com sucesso - ID: 507f1f77bcf86cd799439012

[CONVERSÃO] GET /history - Usuário: 123
[CONVERSÃO] ✅ 5 conversões no histórico
```

---

## 🎯 Verificação Rápida (One-liner)

```powershell
# Ver tudo de uma vez
mongosh --eval "use currency_converter; console.log('Sugestões:', db.suggestions.countDocuments()); console.log('Conversões:', db.conversions.countDocuments()); console.log('Usuários:', db.users.countDocuments());"
```

---

## ⚠️ Se não encontrar dados:

1. ✅ Verifique se o usuário está autenticado (POST requer token)
2. ✅ Verifique se os logs mostram erros (❌ em vez de ✅)
3. ✅ Verifique `.env` - MONGO_URI deve estar correto
4. ✅ Execute `npm install` no backend se houver erro de módulo

---

## 🔧 Limpar collections (se necessário)

```powershell
# ⚠️ CUIDADO: Isso apagará TODOS os dados!

# Limpar sugestões
db.suggestions.deleteMany({})

# Limpar conversões
db.conversions.deleteMany({})

# Limpar usuários
db.users.deleteMany({})
```
