import React from 'react';

const SkeletonLoader = () => (
<>
  <div className="skeleton-profile">
    <div className="skeleton skeleton-avatar"></div>
    <div className="skeleton skeleton-fullname"></div>
    <div className="skeleton skeleton-username"></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text"></div>
  </div>
  <div class="container">
  <div class="loading-wave">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>

</div>
</div>
<div style={{display:'flex',justifyContent:'center'}}>Loading...</div>
  </>
);

export default SkeletonLoader;
