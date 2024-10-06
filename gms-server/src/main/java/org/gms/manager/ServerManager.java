package org.gms.manager;

import lombok.Getter;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.gms.ServerApplication;
import org.gms.constants.net.ServerConstants;
import org.gms.net.server.Server;
import org.gms.util.I18nUtil;
import org.springdoc.core.properties.SpringDocConfigProperties;
import org.springdoc.core.properties.SwaggerUiConfigProperties;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.net.InetAddress;

@Component
@Slf4j
public class ServerManager implements ApplicationContextAware, ApplicationRunner, DisposableBean {
    @Getter
    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(@NonNull ApplicationContext applicationContext) throws BeansException {
        ServerManager.applicationContext = applicationContext;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Server.getInstance().init();

        SpringDocConfigProperties springDocConfigProperties = null;
        SwaggerUiConfigProperties swaggerUiConfigProperties = null;
        try {
            springDocConfigProperties = applicationContext.getBean(SpringDocConfigProperties.class);
            swaggerUiConfigProperties = applicationContext.getBean(SwaggerUiConfigProperties.class);
        } catch (NoSuchBeanDefinitionException e) {
            log.info("springdoc not enabled");
        }
        Environment environment = applicationContext.getBean(Environment.class);
        log.info("版本(Version)：{} && 构建时间(BuildTime)：{}", ServerConstants.BEI_DOU_VERSION,
                ServerConstants.BEI_DOU_BUILD_TIME);
        if (springDocConfigProperties != null && springDocConfigProperties.getApiDocs().isEnabled()
                && swaggerUiConfigProperties != null && swaggerUiConfigProperties.isEnabled()) {
            log.info(I18nUtil.getLogMessage("ServerManager.run.info1"), InetAddress.getLocalHost().getHostAddress(),
                    environment.getProperty("server.port"));
        }
        // 判断是否集成前端，集成则提示前端地址
        try (InputStream resource = ServerApplication.class.getClassLoader().getResourceAsStream("static/index.html")) {
            if (resource != null) {
                log.info(I18nUtil.getLogMessage("ServerManager.run.info2"), InetAddress.getLocalHost().getHostAddress(),
                        environment.getProperty("server.port"));
            }
        }
    }

    @Override
    public void destroy() throws Exception {
        Server.getInstance().shutdownInternal(false);
    }
}
