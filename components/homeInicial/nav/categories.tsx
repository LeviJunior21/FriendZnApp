import amizade from '../../../assets/categories/amizade.webp';
import amor from '../../../assets/categories/amor.jpg';
import diversao from '../../../assets/categories/diversao.jpg';
import saude from '../../../assets/categories/saude.jpeg';
import tecnologia from '../../../assets/categories/tecnologia.jpg';
import esporte from '../../../assets/categories/esporte.png';
import sexualidade from '../../../assets/categories/sexualidade.jpg';
import outro from '../../../assets/categories/outro.jpg';
import astronomia from '../../../assets/categories/astronomia.jpeg';
import estudos from '../../../assets/categories/estudos.jpg';
import dinheiro from '../../../assets/categories/dinheiro.webp';
import familia from '../../../assets/categories/familia.jpg';
import lazer from '../../../assets/categories/lazer.jpg';
import universo from '../../../assets/categories/universo.webp';
import { Categoria } from '../../../utils/interfaces';

export const data = [
    {titulo: "Todas Categorias" ,image: universo, categoria: Categoria.todasCategorias},
    {titulo: "Amizade" ,image: amizade, categoria: Categoria.amizade},
    {titulo: "Amor", image: amor, categoria: Categoria.amor}, 
    {titulo: "Diversão", image: diversao, categoria: Categoria.diversao}, 
    {titulo: "Saúde", image: saude, categoria: Categoria.saude}, 
    {titulo: "Tecnologia", image: tecnologia, categoria: Categoria.tecnologia},
    {titulo: "Esporte", image: esporte, categoria: Categoria.esporte},
    {titulo: "Sexualidade", image: sexualidade, categoria: Categoria.sexualidade},
    {titulo: "Outro", image: outro, categoria: Categoria.outro}, 
    {titulo: "Astronomia", image: astronomia, categoria: Categoria.astronomia}, 
    {titulo: "Estudos", image: estudos, categoria: Categoria.estudos}, 
    {titulo: "Dinheiro", image: dinheiro, categoria: Categoria.dinheiro},
    {titulo: "Família", image: familia, categoria: Categoria.familia},
    {titulo: "Lazer", image: lazer, categoria: Categoria.lazer},
];