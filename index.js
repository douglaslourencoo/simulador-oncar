
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const vehicles = [];
const simulations = [];

app.use(express.json());

// Rotas irão aqui
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

class Vehicle {
  constructor(id, model, brand, color) {
    this.id = id;
    this.model = model;
    this.brand = brand;
    this.color = color;
  }
}

class Simulation {
  constructor(id, clientId, vehicleId, income) {
    this.id = id;
    this.clientId = clientId;
    this.vehicleId = vehicleId;
    this.income = income;
    this.score = Math.floor(Math.random() * 999) + 1;
  }
}

app.get("/vehicles", (req, res) => {
  res.json(vehicles);
});

app.post("/vehicles", (req, res) => {
  const vehicle = new Vehicle(
    vehicles.length,
    req.body.model,
    req.body.brand,
    req.body.color
  );
  vehicles.push(vehicle);
  res.status(201).json(vehicle);
});

app.delete("/vehicles/:id", (req, res) => {
  const index = vehicles.findIndex((v) => v.id == req.params.id);
  if (index !== -1) {
    vehicles.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Veículo não encontrado" });
  }
});

app.post("/simulations", (req, res) => {
  const simulation = new Simulation(
    simulations.length,
    req.body.clientId,
    req.body.vehicleId,
    req.body.income
  );
  simulations.push(simulation);
  res.status(201).json(simulation);
});

app.use(bodyParser.json());

// esquema para veículos
const veiculoSchema = new mongoose.Schema({
  modelo: String,
  marca: String,
  cor: String,
});

const Veiculo = mongoose.model('Veiculo', veiculoSchema);

// esquema para simulações
const simulacaoSchema = new mongoose.Schema({
  userData: {
    nome: String,
    score: Number,
  },
  aprovado: Boolean,
  condicoes: String,
});

const Simulacao = mongoose.model('Simulacao', simulacaoSchema);

// Rotas para veículos
app.get('/veiculo', async (req, res) => {
  try {
    const veiculos = await Veiculo.find();
    res.json(veiculos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/veiculo', async (req, res) => {
  const veiculo = new Veiculo(req.body);
  try {
    const novoVeiculo = await veiculo.save();
    res.status(201).json(novoVeiculo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/veiculo/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Veiculo.findByIdAndDelete(id);
    res.json({ message: 'Veículo removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


  // Lógica para calcular a aprovação e as condições
  const simulacao = new Simulacao({
    userData: simulacaoData.userData,
    aprovado: true,
    condicoes: 'Condições específicas',
  });

  try {
    const novaSimulacao = await simulacao.save();
    res.status(201).json(novaSimulacao);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }




