// Espera o documento estar totalmente carregado antes de executar o código JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Obtém todos os itens do submenu
    var subMenuItems = document.querySelectorAll('.submenu a');
  
    // Adiciona um evento de clique a cada item do submenu
    subMenuItems.forEach(function(item) {
      item.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link
  
        var menuItem = this.textContent;
        var subMenuItem = this.parentNode.parentNode.previousElementSibling.textContent;
        var message = 'Você selecionou: ' + subMenuItem + ' - ' + menuItem;
        alert(message);
      });
    });
  });
// Array com as URLs das imagens do banner
var bannerImages = [
    "img/img1.png",
    "img/img2.png",
    "img/img3.png"
  ];
  
  // Variável para controlar o índice atual da imagem no banner
  var currentImageIndex = 0;
  
  // Função para atualizar a imagem do banner
  function updateBannerImage() {
    var banner = document.getElementById("banner");
    banner.style.backgroundImage = "url(" + bannerImages[currentImageIndex] + ")";
    
    // Atualiza o índice para a próxima imagem
    currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
  }
  
  // Chama a função updateBannerImage a cada 4 segundos
  setInterval(updateBannerImage, 4000);
  