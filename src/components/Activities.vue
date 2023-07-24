<template>
  <div class="activities-container">
    <div class="activities-title">
      <h2>近期活動</h2>
      <router-link class="view-more" to="/home/search-scenic-spot">查看更多活動
        <img src="../assets/images/icon/arrow-rightR.png" alt="">
      </router-link>
    </div>
    <div class="activities-list">
      <div class="activities-card">
        <div class="card-img">
          <img src="https://www.taiwan.net.tw/att/event/32664653-b656-4e7f-bb6d-ed1b726fa3b9.jpg" alt="萬人泳渡盛況">
        </div>
        <div class="card-info">
          <div class="card-info__title">
            <span class="date-range">2021/10/30 - 2021/11/13</span>
            <p class="title">
              2021 日月潭花火音樂嘉年華（字數限制）
            </p>
          </div>
          <div class="card-info__location">
            <p class="location">
              <img src="../assets/images/icon/spot.png" alt="spot-icon">
              新北市
            </p>
            <p class="more-info">
              詳細介紹
              <img src="../assets/images/icon/arrow-rightG.png" alt="">
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>