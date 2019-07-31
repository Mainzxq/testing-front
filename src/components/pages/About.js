import React from "react";
import { Typography } from "@material-ui/core";

const About = () => {
  return (
    <div>
      <Typography variant="h4" component="h4" style={{textAlign: "center", marginTop:64}}>
        关于这个应用
      </Typography>
      <Typography variant="body2" component="p" style={{textAlign: "center", margin: 16}}>
        用作公司问卷系统的原型参考,主要提供问卷答案查询、问卷构建、问卷问题构建、账户管理等。
      </Typography>
      <Typography variant="body1" style={{textAlign: "center", margin: 16}}>
        <strong>Version:</strong> 1.0.0
      </Typography>
    </div>
  );
};

export default About;
