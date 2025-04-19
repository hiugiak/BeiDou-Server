package org.gms.net.encryption;

import org.gms.constants.net.ServerConstants;
import org.gms.util.PacketCreator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelDuplexHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelPromise;
import io.netty.handler.codec.http.websocketx.BinaryWebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;

public class WebSocketAdapter extends ChannelDuplexHandler {
    private static final Logger log = LoggerFactory.getLogger(WebSocketAdapter.class);

    private final InitializationVector sendIv;
    private final InitializationVector recvIv;

    public WebSocketAdapter(InitializationVector sendIv, InitializationVector recvIv) {
        this.sendIv = sendIv;
        this.recvIv = recvIv;
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if (evt instanceof WebSocketServerProtocolHandler.HandshakeComplete) {
            ctx.channel().writeAndFlush(new BinaryWebSocketFrame(Unpooled
                    .wrappedBuffer(PacketCreator.getHello(ServerConstants.VERSION, sendIv, recvIv).getBytes())));
        }
        ctx.fireUserEventTriggered(evt);
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        if (msg instanceof BinaryWebSocketFrame frame) {
            ctx.fireChannelRead(frame.content());
        } else {
            log.warn("Discard non-binary inbound message: {}", msg);
        }
    }

    @Override
    public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise) throws Exception {
        if (msg instanceof ByteBuf buf) {
            WebSocketFrame frame = new BinaryWebSocketFrame(buf);
            ctx.write(frame, promise);
        } else {
            ctx.write(msg, promise);
        }
    }
}
