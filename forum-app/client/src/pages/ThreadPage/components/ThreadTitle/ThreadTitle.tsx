import './ThreadTitle.scss';

interface ThreadTitleProps {
  title?: string;
}

export const ThreadTitle = ({ title }: ThreadTitleProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <div className="thread-title">
      <strong>Title</strong>
      <div className="thread-title__input">
        <input
          className="field__input"
          type="text"
          value={title || ''}
          onChange={handleChange}
          placeholder="Title"
        />
      </div>
    </div>
  );
};
