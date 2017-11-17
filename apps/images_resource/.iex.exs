alias ImagesResource
alias ImagesResource.{Processor, Sources, Queue, Upload}
alias Upload.Download, as: DownloadWorker
alias Upload.Primary, as: PrimaryWorker
alias Upload.Transform, as: TransformWorker
alias Upload.Upload, as: UploadWorker

# {:ok, source_pid} =
#   Sources.S3.start_link(
#     ImageSource,
#     bucket_name: Config.get(:images_resource, :source_bucket),
#     sync_targets: []
#   )

f =
  Sources.S3.tree(ImageSource)
  |> Map.get(:children)
  |> Enum.at(0)
  |> Map.get(:children)
  |> Enum.at(0)

# {:ok, primary_pid} = Queue.start_link(PrimaryQueue)
# {:ok, download_pid} = Queue.start_link(DownloadQueue)
# {:ok, transform_pid} = Queue.start_link(TransformQueue)
# {:ok, upload_pid} = Queue.start_link(UploadQueue)

# {:ok, primary_worker_pid} = Processor.start_link(PrimaryQueue, PrimaryWorker)
# {:ok, download_worker_pid} = Processor.start_link(DownloadQueue, DownloadWorker)
# {:ok, transform_worker_pid} = Processor.start_link(TransformQueue, TransformWorker)
# {:ok, upload_workerpid} = Processor.start_link(UploadQueue, UploadWorker)

# {:ok, queue_processor_pid} = Processor.start_link(PrimaryQueue, UploadWorker, [max_demand: 4])

# {:ok, download_pid} = Upload.Download.start_link()
# {:ok, fan_pid} = Upload.FanOutVersions.start_link()
# {:ok, cleanup_pid} = Upload.Cleanup.start_link()

# Queue.add(PrimaryQueue, {:add, f})
