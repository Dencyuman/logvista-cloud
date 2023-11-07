# ベースとなるDockerイメージを指定
FROM golang:1.21

# アプリケーションディレクトリを設定
WORKDIR /app

# 依存関係のあるGoのモジュールをダウンロード
COPY go.mod go.sum ./
RUN go mod download

# ソースコードをコピー
COPY . .

# ビルド
RUN go build -o cloud-server ./...

# ポートを開ける
EXPOSE 8080

# コマンドを実行
CMD ["./cloud-server"]