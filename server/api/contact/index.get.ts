export default defineEventHandler(() => {
  return {
    content: `
      <div
        class="contact-card"
        style="
          padding: 14px 32px;
          border-radius: 4px;
          background: #fff;
          color: #000;
          font-size: 18px;
          line-height: 2.5;
        "
      >
        <dl
          class="contact-list"
          style="
            margin: 0;
            padding: 0;
          "
        >
          <div class="contact-list__row" style="display: flex; align-items: baseline;">
            <dt style="margin: 0; font-weight: 600;">地址：</dt>
            <dd style="margin: 0; font-weight: 600;">北京市西城区金融大街28号院3号楼5层</dd>
          </div>
          <div class="contact-list__row" style="display: flex; align-items: baseline;">
            <dt style="margin: 0; font-weight: 600;">邮编：</dt>
            <dd style="margin: 0; font-weight: 600;">100033</dd>
          </div>
          <div class="contact-list__row" style="display: flex; align-items: baseline;">
            <dt style="margin: 0; font-weight: 600;">电话：</dt>
            <dd style="margin: 0; font-weight: 600;">010-86625600</dd>
          </div>
          <div class="contact-list__row" style="display: flex; align-items: baseline;">
            <dt style="margin: 0; font-weight: 600;">微信公众号：</dt>
            <dd style="margin: 0; font-weight: 600;">国家电投保险经纪</dd>
          </div>
          <div class="contact-list__row" style="display: flex; align-items: baseline;">
            <dt style="margin: 0; font-weight: 600;">监督举报电话：</dt>
            <dd style="margin: 0; font-weight: 600;">010-86625631</dd>
          </div>
        </dl>

        <div
          class="contact-sections"
          style="
            margin-top: 52px;
            font-size: 18px;
            font-weight: 600;
          "
        >
          <div class="contact-section" style="margin: 14px 0;">
            <span style="display: block; font-family: 宋体;">统保业务部/产权经纪业务部：</span>
            <span style="display: block; font-family: 宋体;">董 柄：010-86625636</span>
          </div>
          <div class="contact-section" style="margin: 14px 0;">
            <span style="display: block; font-family: 宋体;">再保险经纪业务部：</span>
            <span style="display: block; font-family: 宋体;">谢 丹：010-86625675</span>
          </div>
          <div class="contact-section" style="margin: 14px 0;">
            <span style="display: block; font-family: 宋体;">创新业务部：</span>
            <span style="display: block; font-family: 宋体;">戚云龙：010-86625662</span>
          </div>
          <div class="contact-section" style="margin: 14px 0;">
            <span style="display: block; font-family: 宋体;">青海分公司：</span>
            <span style="display: block; font-family: 宋体;">胡麦文赫：0971-3580582</span>
          </div>
        </div>
      </div>
    `,
  };
});
