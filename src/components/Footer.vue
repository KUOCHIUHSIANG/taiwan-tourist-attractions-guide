<template>
  <footer class="footer-container">
    <a href="https://github.com/KUOCHIUHSIANG/taiwan-tourist-attractions-guide" target="_blank">Front-End: Jater Kuo </a>
    <a href="https://2021.thef2e.com/users/6296427084285739247/" target="_blank">UI: Breakfast </a>
    <a href="https://www.figma.com/file/5HQAZ2bunGNKma2fwU0aNZ/The-F2E-3rd---Week1-%E5%8F%B0%E7%81%A3%E6%97%85%E9%81%8A%E6%99%AF%E9%BB%9E%E5%B0%8E%E8%A6%BD?node-id=5-1106&t=5BlCvTfjuXVwleH5-0" target="_blank">#Figma</a>
  </footer>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.footer-container {
  font-family: Noto Sans, sans-serif;
  width: 100%;
  height: 60px;
  margin: 0 auto;
  background-color: $third-color;
  display: flex;
  flex-direction: column;
  justify-content: center;
  a {
    color: #FFFFFF;
    font-size: 14px;
    &:nth-child(2) {
      margin-top: 5px;
    }
    &:nth-child(3) {
      display: none;
    }
    &:hover {
      color: $highlight;
    }
  }
}

@media screen and (min-width: 768px) {
  .footer-container {
    flex-direction: row;
    align-items: center;
    a:nth-child(2) {
      margin: 0 10px;
    }
    a:nth-child(3) {
      display: inline;
    }
  }
}
</style>